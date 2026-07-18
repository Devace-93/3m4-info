#!/usr/bin/env node
// Orchestrator for the 3m4 apps: starts any subset locally in dev (native dev
// servers) or prod (docker compose profiles) mode.
//
//   npm run start:dev                  all apps
//   npm run start:dev -- kinegram      only kinegram (+ info, always)
//   npm run start:prod -- bubbles      prod images for info + bubbles
//
// Registry: apps.yaml. Overrides & secrets: .env (gitignored).

import { spawn, spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- tiny YAML
// Minimal parser for apps.yaml's subset: nested maps by 2-space indentation,
// scalar values, full-line/inline comments. No lists, anchors, or multiline.
function parseYaml(text) {
  const root = {};
  const stack = [{ indent: -1, node: root }];
  for (const rawLine of text.split('\n')) {
    const line = rawLine.replace(/(^|\s)#.*$/, '').trimEnd();
    if (!line.trim()) continue;
    const indent = line.length - line.trimStart().length;
    const [, key, value] = line.trim().match(/^([\w.-]+):\s*(.*)$/) ?? [];
    if (!key) throw new Error(`apps.yaml: cannot parse line "${rawLine}"`);
    while (stack[stack.length - 1].indent >= indent) stack.pop();
    const parent = stack[stack.length - 1].node;
    if (value === '') {
      parent[key] = {};
      stack.push({ indent, node: parent[key] });
    } else {
      let v = value.replace(/^['"]|['"]$/g, '');
      if (/^-?\d+$/.test(v)) v = Number(v);
      else if (v === 'true') v = true;
      else if (v === 'false') v = false;
      parent[key] = v;
    }
  }
  return root;
}

// ---------------------------------------------------------------- dotenv
// Loads KEY=VALUE lines; existing process env always wins.
function loadDotenv(file) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (!m || line.trim().startsWith('#')) continue;
    const [, k, raw] = m;
    if (!(k in process.env)) process.env[k] = raw.replace(/^['"]|['"]$/g, '');
  }
}

// ---------------------------------------------------------------- helpers
const COLORS = [36, 35, 33, 32, 34, 91]; // cyan, magenta, yellow, green, blue, red
const color = (i, s) => `\x1b[${COLORS[i % COLORS.length]}m${s}\x1b[0m`;

function envName(id, suffix) {
  return `${id.toUpperCase().replace(/-/g, '_')}_${suffix}`;
}

function portOf(id, app, mode) {
  const override = process.env[envName(id, mode === 'dev' ? 'DEV_PORT' : 'PROD_PORT')];
  return Number(override ?? (mode === 'dev' ? app.devPort : app.prodPort));
}

function die(msg) {
  console.error(`\x1b[91mstart.mjs: ${msg}\x1b[0m`);
  process.exit(1);
}

function checkEngine(engine) {
  const probe = spawnSync(engine, ['--version'], { stdio: 'ignore', shell: process.platform === 'win32' });
  if (probe.error || probe.status !== 0) {
    die(`"${engine}" is required but not available on PATH`);
  }
}

// ---------------------------------------------------------------- selection
loadDotenv(resolve(ROOT, '.env'));
const registry = parseYaml(readFileSync(resolve(ROOT, 'apps.yaml'), 'utf8')).apps;

const [mode, ...requested] = process.argv.slice(2);
if (mode !== 'dev' && mode !== 'prod') die('usage: start.mjs <dev|prod> [app…]');

for (const name of requested) {
  if (!registry[name]) die(`unknown app "${name}" — known: ${Object.keys(registry).join(', ')}`);
}

// info always runs (it's the index); default = every app.
const wanted = new Set(requested.length ? ['info', ...requested] : Object.keys(registry));
// devOnly apps run only in dev, and companions (startWith) join automatically.
for (const [id, app] of Object.entries(registry)) {
  if (app.devOnly) {
    if (mode === 'prod') wanted.delete(id);
    else if (app.startWith && wanted.has(app.startWith)) wanted.add(id);
  }
}
const selected = Object.entries(registry).filter(([id]) => wanted.has(id));

// ---------------------------------------------------------------- env overlay
// Cross-links: info points at locally running apps; each app gets its local
// site URL so share links/og tags are local too. Apps not selected keep their
// committed production defaults.
function overlayFor(id, app, mode) {
  const env = { ...process.env };
  const host = (port) => `http://localhost:${port}`;
  if (id === 'info') {
    for (const [oid, other] of selected) {
      if (other.urlVar) env[other.urlVar] = host(portOf(oid, other, mode));
    }
  } else {
    env.VITE_SITE_URL = host(portOf(id, app, mode));
  }
  return env;
}

// ---------------------------------------------------------------- dev mode
function runDev() {
  const children = [];
  let width = Math.max(...selected.map(([id]) => id.length));

  selected.forEach(([id, app], i) => {
    checkEngine(app.engine);
    const port = portOf(id, app, 'dev');
    const env = overlayFor(id, app, 'dev');
    let cmd = app.devCmd;
    if (id === 'bubbles-classic') {
      env.PORT = String(port); // legacy server reads PORT
    } else {
      // npm needs "--" before forwarded flags; bun forwards them directly.
      const sep = app.engine === 'npm' ? ' -- ' : ' ';
      cmd += `${sep}--port ${port}`;
      if (id !== 'info') cmd += ' --strictPort'; // vite; astro has no such flag
    }
    const child = spawn(cmd, { cwd: resolve(ROOT, app.path), env, shell: true, detached: true });
    children.push(child);
    const tag = color(i, id.padEnd(width));
    const pipe = (stream, out) =>
      stream.on('data', (buf) => {
        for (const line of buf.toString().split('\n')) if (line.trim()) out.write(`${tag} │ ${line}\n`);
      });
    pipe(child.stdout, process.stdout);
    pipe(child.stderr, process.stderr);
    child.on('exit', (code) => {
      if (code !== null && code !== 0) console.error(`${tag} │ exited with code ${code}`);
    });
    console.log(`${tag} │ → http://localhost:${port}`);
  });

  const stopAll = () => {
    for (const child of children) {
      try { process.kill(-child.pid, 'SIGTERM'); } catch { /* already gone */ }
    }
    process.exit(0);
  };
  process.on('SIGINT', stopAll);
  process.on('SIGTERM', stopAll);
}

// ---------------------------------------------------------------- prod mode
function runProd() {
  checkEngine('docker');
  const env = { ...process.env };
  const args = ['compose'];
  for (const [id, app] of selected) {
    args.push('--profile', app.prodService);
    const port = portOf(id, app, 'prod');
    env[envName(id, 'PROD_PORT')] = String(port);
    // Build-time site URLs (compose interpolates these into build args).
    if (id !== 'info') env[envName(id, 'SITE_URL')] = `http://localhost:${port}`;
  }
  // Info's cards: local URL for apps in this run, production URL otherwise
  // (never compose's localhost defaults, which assume a full local run).
  for (const [oid, other] of Object.entries(registry)) {
    if (!other.urlVar) continue;
    env[`INFO_${other.urlVar.replace('PUBLIC_', '')}`] = wanted.has(oid)
      ? `http://localhost:${portOf(oid, other, 'prod')}`
      : other.url;
  }
  args.push('up', '--build');
  console.log(`docker ${args.join(' ')}`);
  const child = spawn('docker', args, { cwd: ROOT, env, stdio: 'inherit' });
  child.on('exit', (code) => process.exit(code ?? 0));
}

console.log(`Starting [${[...wanted].join(', ')}] in ${mode} mode\n`);
if (mode === 'dev') runDev();
else runProd();

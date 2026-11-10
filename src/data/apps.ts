export interface AppEntry {
  /** Stable slug used for i18n keys (`<id>Desc` in src/i18n/catalog.ts). */
  id: string;
  name: string;
  url: string;
  category: string;
  description: string;
  status: 'live' | 'building';
  /** The app's own og:image — shown as the card's banner. Omit until the app ships one. */
  image?: string;
}

// App URLs come from env (PUBLIC_*) so orchestrated local runs can point the
// cards at locally running apps; committed defaults are the production URLs.
const KINEGRAM_URL = import.meta.env.PUBLIC_KINEGRAM_URL || 'https://kinegram.3m4.net';
const BUBBLES_URL = import.meta.env.PUBLIC_BUBBLES_URL || 'https://bubbles.3m4.net';
const SHORTENER_URL = import.meta.env.PUBLIC_SHORTENER_URL || 'https://3m4.net';
const RETRO_URL = import.meta.env.PUBLIC_RETRO_URL || 'https://retro.3m4.net';
const SMART_DOCS_URL = import.meta.env.PUBLIC_SMART_DOCS_URL || 'https://smart-docs.3m4.net';
const EXP_URL = import.meta.env.PUBLIC_EXP_URL || 'https://exp.3m4.net';
const METRICS_URL = import.meta.env.PUBLIC_METRICS_URL || 'https://metrics.3m4.net';
const WARS_URL = import.meta.env.PUBLIC_WARS_URL || 'https://wars.3m4.net';
const OOPS_URL = import.meta.env.PUBLIC_OOPS_URL || 'https://oops.3m4.net';
const MOUSETOUCH_URL = import.meta.env.PUBLIC_MOUSETOUCH_URL || 'https://mouse.3m4.net';
const BOOTPICK_URL = import.meta.env.PUBLIC_BOOTPICK_URL || 'https://bootpick.3m4.net';
const COSMIC_SWIPE_URL = import.meta.env.PUBLIC_COSMIC_SWIPE_URL || 'https://cosmic-swipe.3m4.net';
const FLOWS_URL = import.meta.env.PUBLIC_FLOWS_URL || 'https://flows.3m4.net';
const CREW_URL = import.meta.env.PUBLIC_CREW_URL || 'https://crew.3m4.net';
const SKETCH_URL = import.meta.env.PUBLIC_SKETCH_URL || 'https://sketch.3m4.net';
const BLUEPRINT_URL = import.meta.env.PUBLIC_BLUEPRINT_URL || 'https://blueprint.3m4.net';
const TRACE_URL = import.meta.env.PUBLIC_TRACE_URL || 'https://trace.3m4.net';

export interface CategoryEntry {
  name: string;
  /** i18n key for the heading (src/i18n/catalog.ts). */
  key: string;
  /** Optional label shown next to the heading, e.g. a whole section still in beta. */
  badge?: 'beta';
}

// Sections, in the order they appear on the page. A category used by an app
// but missing here is appended after these, untranslated.
export const categories: CategoryEntry[] = [
  { name: 'Desktop & Drivers', key: 'catDesktop' },
  { name: 'Games', key: 'catGames' },
  { name: 'Tools & Generators', key: 'catTools', badge: 'beta' },
  { name: 'AI Agents', key: 'catAgents' },
];

// Add new apps here as they get published — each entry becomes a card,
// grouped by `category` and ordered by the `categories` list above.
export const apps: AppEntry[] = [
  {
    id: 'wars',
    name: 'Wars',
    url: WARS_URL,
    category: 'Games',
    description:
      'An open-source real-time strategy game in the spirit of the classic age-advancing RTS: 13 civilisations, four ages, random maps, a scenario editor, computer players and online multiplayer. Desktop, console, Android and iOS clients share one deterministic engine written in Rust.',
    status: 'building',
    image: `${WARS_URL}/og-image.png`,
  },
  {
    id: 'kinegram',
    name: 'Kinegram Generator',
    url: KINEGRAM_URL,
    category: 'Tools & Generators',
    description:
      'Turn animated GIFs into print-ready kinegrams (scanimations) — the interlaced image and its barrier grid, generated together.',
    status: 'live',
    image: `${KINEGRAM_URL}/og-image.png`,
  },
  {
    id: 'bubbles',
    name: 'Bubbles',
    url: BUBBLES_URL,
    category: 'Games',
    description:
      'A fruit-popping arcade mini-game. Pop fruit, dodge vegetables, chain streaks — classic 2015 edition and a Phaser 3 remaster.',
    status: 'live',
    image: `${BUBBLES_URL}/og/share.png`,
  },
  {
    id: 'shortener',
    name: '3m4',
    url: SHORTENER_URL,
    category: 'Tools & Generators',
    description:
      'Open-source URL shortener with real click analytics — geo/device/referrer breakdowns, QR codes, a public API and an MCP server for AI agents. Free during early access.',
    status: 'live',
    image: `${SHORTENER_URL}/og-image.png`,
  },
  {
    id: 'retro',
    name: 'retro',
    url: RETRO_URL,
    category: 'Tools & Generators',
    description:
      'Open-source user feedback for your apps — bug reports, feedback and feature requests through a drop-in widget or a public API, a public roadmap and changelog users can vote on, and an MCP server for AI agents. Free during early access.',
    status: 'live',
    image: `${RETRO_URL}/og-image.png`,
  },
  {
    id: 'smartDocs',
    name: 'Smart Docs',
    url: SMART_DOCS_URL,
    category: 'Tools & Generators',
    description:
      'Open-source knowledge base where people and AI agents are equal users. Markdown pages in projects, published as HTML, raw Markdown and llms.txt, with a REST API and an MCP server.',
    status: 'live',
    image: `${SMART_DOCS_URL}/og-image.png`,
  },
  {
    id: 'exp',
    name: 'exp',
    url: EXP_URL,
    category: 'Tools & Generators',
    description:
      'Open-source feature flags for projects, people and AI agents — per-environment toggles, percentage rollouts, copy flags between projects, a public API and an MCP server. Free during early access.',
    status: 'live',
    image: `${EXP_URL}/og-image.png`,
  },
  {
    id: 'metrics',
    name: 'metrics',
    url: METRICS_URL,
    category: 'Tools & Generators',
    description:
      'Open-source, privacy-friendly web analytics — page views, visitors, pages, referrers, countries, devices and custom events from one script tag, a pixel or an API call. No cookies, no stored IPs, and an MCP server for AI agents. Free during early access.',
    status: 'live',
    image: `${METRICS_URL}/og-image.png`,
  },
  {
    id: 'oops',
    name: 'oops',
    url: OOPS_URL,
    category: 'Tools & Generators',
    description:
      'Open-source error tracking for your apps — the browser SDK and the ingest API catch exceptions, group them into issues by fingerprint, show affected users, releases and environments with breadcrumbs, and let you triage from the dashboard, the API or an MCP server for AI agents. Free during early access.',
    status: 'live',
    image: `${OOPS_URL}/og-image.png`,
  },
  {
    id: 'mousetouch',
    name: 'MouseTouch',
    url: MOUSETOUCH_URL,
    category: 'Desktop & Drivers',
    description:
      'Native-feeling multitouch gestures for the Apple Magic Mouse on Linux/Wayland: workspace swipes with the desktop\'s own animation, pinch zoom, configurable taps and per-app rules, from a small userspace driver with a GTK settings app. One-line install, .deb/.rpm, AUR, Homebrew, Nix, crates.io.',
    status: 'live',
    image: `${MOUSETOUCH_URL}/og-image.png`,
  },
  {
    id: 'bootpick',
    name: 'bootpick',
    url: BOOTPICK_URL,
    category: 'Desktop & Drivers',
    description: "A graphical UEFI boot menu with mouse support for computers with several systems: big icons with each system's real name and logo, backgrounds, many languages, and a desktop settings app that can hide the GRUB and systemd-boot menus behind it. Prebuilt release, easy to turn off or remove.",
    status: 'live',
    image: `${BOOTPICK_URL}/og-image.png`,
  },
  {
    id: 'cosmicSwipe',
    name: 'cosmic-swipe',
    url: COSMIC_SWIPE_URL,
    category: 'Desktop & Drivers',
    description: "Swipe between workspaces inside the COSMIC workspace overview on Pop!_OS, with the strip following your fingers like macOS Mission Control. Prebuilt, no sudo, easy to remove.",
    status: 'live',
    image: `${COSMIC_SWIPE_URL}/demo.gif`,
  },
  {
    id: 'flows',
    name: 'flows',
    url: FLOWS_URL,
    category: 'AI Agents',
    description:
      'Workflows for AI coding agents — triggers from GitHub, webhooks and cron run agent steps on your repos and PRs, with an MCP server and a CLI that syncs your agents and skills into Claude Code, Codex and Cursor.',
    status: 'building',
  },
  {
    id: 'crew',
    name: 'crew',
    url: CREW_URL,
    category: 'AI Agents',
    description:
      'Agent roles and skills, defined once and used by every AI tool — QA, security and accessibility reviewers, skills in the open SKILL.md format, compiled for Claude Code, Codex, Cursor and Gemini CLI.',
    status: 'building',
  },
  {
    id: 'sketch',
    name: 'sketch',
    url: SKETCH_URL,
    category: 'AI Agents',
    description:
      'Draw UI mocks with stencils, device frames, notes and real screenshots, saved as PNG plus structured JSON so an agent can implement them.',
    status: 'building',
  },
  {
    id: 'blueprint',
    name: 'blueprint',
    url: BLUEPRINT_URL,
    category: 'AI Agents',
    description:
      'Architecture, code and flow diagrams kept as text (Mermaid) with versions and repo links, regenerated by an agent when a PR merges.',
    status: 'building',
  },
  {
    id: 'trace',
    name: 'trace',
    url: TRACE_URL,
    category: 'AI Agents',
    description:
      'Logs and audit for AI agents — every workflow run is a trace with steps, tool calls, tokens and cost, from workflows or straight from Claude Code, Codex and Cursor.',
    status: 'building',
  },
];

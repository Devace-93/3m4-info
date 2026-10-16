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
const OOPS_URL = import.meta.env.PUBLIC_OOPS_URL || 'https://oops.3m4.net';

// Add new apps here as they get published — each entry becomes a card,
// grouped and ordered by `category` in the order categories first appear.
export const apps: AppEntry[] = [
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
];

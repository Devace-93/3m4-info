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
      'Open-source URL shortener with real click analytics — geo/device/referrer breakdowns, custom domains, QR codes.',
    status: 'building',
  },
];

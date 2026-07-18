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

// Add new apps here as they get published — each entry becomes a card,
// grouped and ordered by `category` in the order categories first appear.
export const apps: AppEntry[] = [
  {
    id: 'kinegram',
    name: 'Kinegram Generator',
    url: 'https://kinegram.3m4.net',
    category: 'Tools & Generators',
    description:
      'Turn animated GIFs into print-ready kinegrams (scanimations) — the interlaced image and its barrier grid, generated together.',
    status: 'live',
    image: 'https://kinegram.3m4.net/og-image.png',
  },
  {
    id: 'bubbles',
    name: 'Bubbles',
    url: 'https://bubbles.3m4.net',
    category: 'Games',
    description:
      'A fruit-popping arcade mini-game. Pop fruit, dodge vegetables, chain streaks — classic 2015 edition and a Phaser 3 remaster.',
    status: 'live',
    image: 'https://bubbles.3m4.net/og/share.png',
  },
  {
    id: 'shortener',
    name: '3m4',
    url: 'https://3m4.net',
    category: 'Tools & Generators',
    description:
      'Open-source URL shortener with real click analytics — geo/device/referrer breakdowns, custom domains, QR codes.',
    status: 'building',
  },
];

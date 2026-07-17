export interface AppEntry {
  name: string;
  url: string;
  category: string;
  description: string;
  status: 'live' | 'building';
}

// Add new apps here as they get published — each entry becomes a card,
// grouped and ordered by `category` in the order categories first appear.
export const apps: AppEntry[] = [
  {
    name: 'Kinegram Generator',
    url: 'https://kinegram.3m4.net',
    category: 'Tools & Generators',
    description:
      'Turn animated GIFs into print-ready kinegrams (scanimations) — the interlaced image and its barrier grid, generated together.',
    status: 'live',
  },
  {
    name: 'Bubbles',
    url: 'https://bubbles.3m4.net',
    category: 'Games',
    description:
      'A fruit-popping arcade mini-game. Pop fruit, dodge vegetables, chain streaks — classic 2015 edition and a Phaser 3 remaster.',
    status: 'live',
  },
  {
    name: '3m4',
    url: 'https://3m4.net',
    category: 'Tools & Generators',
    description:
      'Open-source URL shortener with real click analytics — geo/device/referrer breakdowns, custom domains, QR codes.',
    status: 'building',
  },
];

# 3m4 — Apps index

**🌐 https://info.3m4.net**

A small static index of apps and tools published under `3m4.net`, grouped by
category. New apps get added as a data entry — no redesign needed.

## Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build in dist/
npm run preview   # serve the build locally
```

### Docker

```bash
docker compose up --build   # → http://localhost:8080
```

## Adding an app

Add an entry to [`src/data/apps.ts`](src/data/apps.ts):

```ts
{
  name: 'App name',
  url: 'https://app.3m4.net',
  category: 'Tools & Generators', // reuses an existing category, or creates a new section
  description: 'One sentence describing what it does.',
  status: 'live', // or 'building' — shown as a badge, not linked out until live
}
```

### Stack

| Area | Technology |
|---|---|
| Site | [Astro](https://astro.build) — static output, no client JS |
| Build | Node 22 |

## Deploy

Every push to `main` builds and publishes automatically to GitHub Pages via
GitHub Actions (`.github/workflows/deploy.yml`), served on the custom domain
`info.3m4.net`.

## License

[MIT](LICENSE) © 2026 Enrique Magallon Alvarez.

// Light/dark toggle. Follows the system preference until the user picks one
// explicitly; the choice persists in localStorage and is applied pre-paint by
// the inline script in Base.astro.

const KEY = '3m4.theme';

type Theme = 'light' | 'dark';

function getTheme(): Theme {
  const saved = localStorage.getItem(KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function initThemeToggle(): void {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const renderIcon = (): void => {
    btn.textContent = getTheme() === 'light' ? '☀️' : '🌙';
  };
  renderIcon();
  btn.addEventListener('click', () => {
    const next: Theme = getTheme() === 'light' ? 'dark' : 'light';
    localStorage.setItem(KEY, next);
    document.documentElement.dataset.theme = next;
    renderIcon();
  });
}

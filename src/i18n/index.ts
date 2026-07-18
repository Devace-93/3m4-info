import { CATALOG, LANGS, RTL_LANGS } from './catalog';

const KEY = '3m4.lang';

export function getLang(): string {
  const saved = localStorage.getItem(KEY);
  if (saved) {
    if (LANGS.some((l) => l.code === saved)) return saved;
    // Legacy stored base codes migrate to the first matching country locale
    // ('es' → 'es-MX', 'en' → 'en-US', …).
    const migrated = LANGS.find((l) => l.code.startsWith(saved));
    if (migrated) return migrated.code;
  }
  const nav = navigator.language || 'en-US';
  if (LANGS.some((l) => l.code === nav)) return nav;
  const base = nav.slice(0, 2);
  // This site's reference language is English, so the final fallback is en-US.
  return LANGS.find((l) => l.code.startsWith(base))?.code ?? 'en-US';
}

export function setLang(lang: string): void {
  localStorage.setItem(KEY, lang);
  apply();
}

// Per-key resolution for 'xx-YY': country variant → base language → es/en.
function t(key: string): string {
  const lang = getLang();
  const base = lang.slice(0, 2);
  return (
    CATALOG[lang]?.[key] ??
    CATALOG[base]?.[key] ??
    (base === 'es' ? CATALOG.es : CATALOG.en)[key] ??
    key
  );
}

// Keeps <head> metadata (title, description, Open Graph) in the active language.
function setMeta(selector: string, content: string): void {
  document.querySelector(selector)?.setAttribute('content', content);
}

function apply(): void {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL_LANGS.includes(lang.slice(0, 2)) ? 'rtl' : 'ltr';
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n!);
  });
  const title = t('metaTitle');
  const desc = t('metaDescription');
  document.title = title;
  setMeta('meta[name="description"]', desc);
  setMeta('meta[property="og:title"]', title);
  setMeta('meta[property="og:description"]', desc);
  setMeta('meta[name="twitter:title"]', title);
  setMeta('meta[name="twitter:description"]', desc);
}

// Language picker mirroring kinegram.3m4.net's and bubbles.3m4.net's: a button
// with the current flag + language name + caret, and a dropdown with a search
// box. Styled via the page's CSS variables so it matches the info page.
const CSS = `
.lang-sel { position: relative; }
.lang-sel > button {
  display: flex; align-items: center; gap: 7px;
  background: var(--surface); border: 1px solid var(--border);
  color: var(--text); border-radius: 999px; padding: 6px 13px;
  font-weight: 600; cursor: pointer; font-size: 0.85rem; font-family: inherit;
}
.lang-sel > button:hover { background: var(--surface-hover); border-color: var(--accent); }
.lang-sel > button .caret { opacity: 0.6; font-size: 0.8em; }
@media (max-width: 640px) { .lang-sel > button .lname { display: none; } }
.lang-sel .panel {
  position: absolute; top: calc(100% + 8px); right: 0; z-index: 60;
  background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
  padding: 8px; min-width: 230px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}
[dir="rtl"] .lang-sel .panel { right: auto; left: 0; }
.lang-sel .panel input {
  width: 100%; box-sizing: border-box; margin-bottom: 8px;
  background: var(--bg); border: 1px solid var(--border);
  border-radius: 8px; color: var(--text); padding: 6px 10px;
  font-size: 0.92em; font-family: inherit;
}
.lang-sel .panel input::placeholder { color: var(--text-dim); }
.lang-sel .list { max-height: 288px; overflow-y: auto; }
.lang-sel .list button {
  display: flex; align-items: center; gap: 9px; width: 100%;
  background: none; border: none; color: var(--text); cursor: pointer;
  padding: 7px 10px; border-radius: 8px; font-size: 0.92em; text-align: start;
  font-family: inherit;
}
.lang-sel .list button:hover { background: var(--surface-hover); }
.lang-sel .list button.active { background: color-mix(in srgb, var(--accent) 22%, transparent); }
`;

const norm = (s: string): string =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function mountLangSelector(container: HTMLElement): void {
  if (!document.getElementById('lang-sel-css')) {
    const style = document.createElement('style');
    style.id = 'lang-sel-css';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  container.classList.add('lang-sel');
  const current = LANGS.find((l) => l.code === getLang()) ?? LANGS.find((l) => l.code === 'en-US')!;
  container.innerHTML = `
    <button type="button" aria-haspopup="listbox" aria-label="Language">
      <span>${current.flag}</span><span class="lname">${current.name}</span><span class="caret">▾</span>
    </button>
    <div class="panel" hidden>
      <input type="search" aria-label="Search" />
      <div class="list" role="listbox"></div>
    </div>`;

  const toggle = container.querySelector<HTMLButtonElement>(':scope > button')!;
  const panel = container.querySelector<HTMLElement>('.panel')!;
  const search = panel.querySelector<HTMLInputElement>('input')!;
  const list = panel.querySelector<HTMLElement>('.list')!;

  const render = (query: string): void => {
    const q = norm(query);
    const matches = LANGS.filter((l) => norm(`${l.name} ${l.code} ${l.alias}`).includes(q));
    list.innerHTML = matches
      .map(
        (l) =>
          `<button type="button" role="option" data-code="${l.code}"
            class="${l.code === current.code ? 'active' : ''}">${l.flag} ${l.name}</button>`,
      )
      .join('');
  };
  render('');

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.hidden = !panel.hidden;
    if (!panel.hidden) {
      search.value = '';
      render('');
      search.focus();
    }
  });
  panel.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('click', () => {
    panel.hidden = true;
  });
  search.addEventListener('input', () => render(search.value));
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') panel.hidden = true;
    if (e.key === 'Enter') {
      const first = list.querySelector<HTMLElement>('[data-code]');
      if (first) first.click();
    }
  });
  list.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-code]');
    if (!btn) return;
    setLang(btn.dataset.code!);
    // Rebuild so the toggle shows the newly selected flag + name.
    mountLangSelector(container);
  });
}

export function initI18n(): void {
  apply();
  const slot = document.getElementById('lang-sel');
  if (slot) mountLangSelector(slot);
}

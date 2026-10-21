// Account section on the index page. The accounts.3m4.net widget (session.js,
// loaded with `defer` and mounted in the header) owns the session state and
// exposes `window.m4session`; this module only mirrors that state into the
// "Your 3m4 account" section: Log in / Sign up when signed out, Manage account /
// Log out when signed in. Without the widget (offline, blocked) the static
// links keep working.

interface SessionUser {
  handle: string;
}

interface M4Session {
  onChange(cb: (user: SessionUser | null) => void): () => void;
  logout(): Promise<void> | void;
}

function bind(): boolean {
  const session = (window as unknown as { m4session?: M4Session }).m4session;
  if (!session) return false;

  const signedOut = document.querySelector<HTMLElement>('[data-signed-out]');
  const signedIn = document.querySelector<HTMLElement>('[data-signed-in]');
  const logout = document.getElementById('account-logout');
  if (!signedOut || !signedIn) return true;

  session.onChange((user) => {
    signedOut.hidden = !!user;
    signedIn.hidden = !user;
  });
  logout?.addEventListener('click', () => {
    void session.logout();
  });
  return true;
}

export function initAccountSection(): void {
  // Both scripts are deferred; the widget normally runs first, but do not
  // depend on the order: retry briefly, then give up quietly.
  const returnTo = encodeURIComponent(location.href);
  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-account-link]')) {
    link.href = `${link.href}?return_to=${returnTo}`;
  }
  if (bind()) return;
  let tries = 0;
  const timer = setInterval(() => {
    if (bind() || ++tries > 20) clearInterval(timer);
  }, 100);
}

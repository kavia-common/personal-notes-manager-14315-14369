import { useRuntimeConfig } from '#imports';

type User = { email: string };

const AUTH_KEY = 'notes.auth.v1';

// PUBLIC_INTERFACE
export function useAuth() {
  /**
   * This is a minimal auth composable for demo:
   * - Stores a user token in localStorage
   * - Accepts any non-empty email/password as "login"
   * - If runtimeConfig.public.apiBase is provided, endpoints can be wired here
   */
  const user = useState<User | null>('auth_user', () => {
    if (process.client) {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) {
        try { return JSON.parse(raw) as User; } catch { /* noop */ }
      }
    }
    return null;
  });

  const config = useRuntimeConfig();

  // PUBLIC_INTERFACE
  async function login(email: string, password: string): Promise<boolean> {
    /** Perform login; if API exists, call it, else accept basic email/pass */
    if (!email || !password) return false;

    const apiBase = (config.public?.apiBase || '').trim();

    if (apiBase) {
      try {
        // Example of API call
        const resp = await $fetch<{ email: string }>(`${apiBase}/auth/login`, {
          method: 'POST',
          body: { email, password },
        });
        user.value = { email: resp.email };
      } catch {
        return false;
      }
    } else {
      // Local acceptance
      user.value = { email };
    }

    if (process.client) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user.value));
    }
    return true;
  }

  // PUBLIC_INTERFACE
  async function logout() {
    /** Clears local user (and calls API if configured) */
    const apiBase = (config.public?.apiBase || '').trim();
    if (apiBase) {
      try {
        await $fetch(`${apiBase}/auth/logout`, { method: 'POST' });
      } catch {
        // ignore
      }
    }
    user.value = null;
    if (process.client) localStorage.removeItem(AUTH_KEY);
  }

  return { user, login, logout };
}

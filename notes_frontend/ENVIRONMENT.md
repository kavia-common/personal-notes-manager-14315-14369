# Environment Configuration

This frontend can operate:
- Fully client-side using localStorage (default)
- Or with a backend API if configured

Available environment variable:
- NUXT_PUBLIC_API_BASE: Base URL for the backend API (e.g., https://api.example.com). If set, authentication and notes CRUD will be executed against the API paths:
  - POST `${NUXT_PUBLIC_API_BASE}/auth/login`
  - POST `${NUXT_PUBLIC_API_BASE}/auth/logout`
  - GET `${NUXT_PUBLIC_API_BASE}/notes`
  - GET `${NUXT_PUBLIC_API_BASE}/notes/:id`
  - POST `${NUXT_PUBLIC_API_BASE}/notes`
  - PUT `${NUXT_PUBLIC_API_BASE}/notes/:id`
  - DELETE `${NUXT_PUBLIC_API_BASE}/notes/:id`

When not set, the app will:
- Accept any non-empty email/password to "login"
- Store notes in localStorage

Run:
- npm install
- npm run dev (on port 3000)

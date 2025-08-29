/**
 * Nuxt configuration for Notes frontend with runtime config and CORS headers.
 */
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Notes - Personal Notes Manager',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Create, edit, and manage personal notes.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '', // if provided, will be used by services; otherwise fallback to localStorage
    }
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});

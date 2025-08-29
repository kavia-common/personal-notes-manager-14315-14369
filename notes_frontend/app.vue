<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Root app simply renders the selected layout and page
</script>

<style>
/* Global resets and fonts */
:root {
  --color-primary: #4f46e5; /* Indigo 600 */
  --color-secondary: #64748b; /* Slate 500 */
  --color-accent: #f59e42; /* Accent orange */
  --bg: #f9fafb;
  --surface: #ffffff;
  --text: #0f172a;
  --muted: #475569;
  --border: #e5e7eb;
}

* { box-sizing: border-box; }
html, body, #__nuxt { height: 100%; }
body {
  margin: 0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  background: var(--bg);
  color: var(--text);
}
a { color: var(--color-primary); text-decoration: none; }
button { font: inherit; }
input, textarea, select {
  font: inherit;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 12px;
  outline: none;
  transition: border-color .2s, box-shadow .2s;
  background: #fff;
}
input:focus, textarea:focus, select:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79,70,229,.15);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  border-radius: 12px;
  padding: 10px 14px;
  cursor: pointer;
  transition: transform .05s ease, box-shadow .2s, background .2s, color .2s;
  white-space: nowrap;
}
.btn:active { transform: translateY(1px); }
.btn-primary {
  background: var(--color-primary);
  color: #fff;
  box-shadow: 0 6px 14px rgba(79,70,229,.22);
}
.btn-primary:hover { box-shadow: 0 8px 18px rgba(79,70,229,.3); }
.btn-secondary {
  background: var(--color-secondary);
  color: #fff;
  box-shadow: 0 6px 14px rgba(100,116,139,.22);
}
.btn-ghost {
  background: transparent;
  color: var(--color-secondary);
}
.badge {
  display: inline-block;
  background: rgba(245,158,66,.15);
  color: var(--color-accent);
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(2,6,23,.04);
}
hr {
  border: 0;
  border-top: 1px solid var(--border);
}
</style>

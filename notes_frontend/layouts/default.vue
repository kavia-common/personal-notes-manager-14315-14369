<template>
  <div class="layout">
    <aside class="sidebar card">
      <div class="brand">
        <div class="logo">🗒️</div>
        <div class="title">Notes</div>
      </div>
      <nav class="nav">
        <NuxtLink class="nav-item" to="/">Home</NuxtLink>
        <NuxtLink class="nav-item" to="/notes">My Notes</NuxtLink>
      </nav>
      <div class="sidebar-footer">
        <div class="badge">Light Theme</div>
      </div>
    </aside>

    <div class="main">
      <header class="topbar card">
        <div class="left">
          <slot name="header-left">
            <span class="app-title">Personal Notes Manager</span>
          </slot>
        </div>
        <div class="right">
          <template v-if="auth.user">
            <span class="welcome">Hello, {{ auth.user.email }}</span>
            <button class="btn btn-ghost" @click="goCreate">+ New Note</button>
            <button class="btn btn-secondary" @click="logout">Logout</button>
          </template>
          <template v-else>
            <NuxtLink class="btn btn-primary" to="/login">Login</NuxtLink>
          </template>
        </div>
      </header>

      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/stores/useAuth';

const router = useRouter();
const auth = useAuth();

function goCreate() {
  router.push('/notes?create=1');
}

async function logout() {
  await auth.logout();
  router.push('/login');
}
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 18px;
  padding: 18px;
  min-height: 100vh;
}
.sidebar {
  padding: 18px;
  position: sticky;
  top: 18px;
  height: calc(100vh - 36px);
  display: flex;
  flex-direction: column;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}
.logo {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 20px;
  box-shadow: 0 8px 20px rgba(79,70,229,.28);
}
.title {
  font-weight: 800;
  letter-spacing: .2px;
}
.nav {
  display: grid;
  gap: 6px;
}
.nav-item {
  padding: 10px 12px;
  border-radius: 10px;
  color: var(--muted);
  border: 1px solid transparent;
}
.nav-item:hover {
  background: #f8fafc;
  border-color: var(--border);
  color: var(--text);
}
.sidebar-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topbar {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
  margin-bottom: 18px;
}
.app-title {
  font-weight: 700;
  color: var(--text);
}
.welcome {
  color: var(--muted);
  margin-right: 8px;
}
.content {
  min-height: 60vh;
}
.main { display: flex; flex-direction: column; }

@media (max-width: 980px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .sidebar {
    position: static;
    height: auto;
    order: 2;
  }
  .topbar { position: sticky; top: 0; z-index: 10; }
}
</style>

<template>
  <div class="container">
    <section class="hero card" style="padding: 28px; display: grid; gap: 10px;">
      <div class="badge">Modern • Light Theme</div>
      <h1 style="margin: 0;">Your ideas, organized.</h1>
      <p style="color: var(--muted); max-width: 680px;">
        Create, edit, and manage your personal notes with a clean, responsive interface. Secure your thoughts with simple authentication and keep everything at your fingertips.
      </p>
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <NuxtLink class="btn btn-primary" to="/notes">Open My Notes</NuxtLink>
        <NuxtLink class="btn btn-ghost" to="/login">Login</NuxtLink>
      </div>
    </section>

    <section style="margin-top: 18px; display: grid; gap: 12px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
      <div class="card" style="padding: 18px;">
        <h3 style="margin-top: 0;">Fast</h3>
        <p style="color: var(--muted);">Create and edit notes instantly with an intuitive editor.</p>
      </div>
      <div class="card" style="padding: 18px;">
        <h3 style="margin-top: 0;">Organized</h3>
        <p style="color: var(--muted);">Search and manage your content seamlessly with a simple list.</p>
      </div>
      <div class="card" style="padding: 18px;">
        <h3 style="margin-top: 0;">Responsive</h3>
        <p style="color: var(--muted);">Designed to look great on any device, big or small.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Landing page content only
</script>

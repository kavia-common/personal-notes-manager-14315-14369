<template>
  <div class="container" style="display: grid; place-items: center; min-height: 70vh;">
    <div class="card" style="padding: 24px; width: 100%; max-width: 420px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
        <h2 style="margin: 0;">Login</h2>
        <div class="badge">Secure</div>
      </div>
      <p style="color: var(--muted); margin-top: 0;">Enter your credentials to continue.</p>
      <form @submit.prevent="onSubmit" style="display: grid; gap: 12px;">
        <div>
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" placeholder="you@example.com" required />
        </div>
        <div>
          <label for="pass">Password</label>
          <input id="pass" v-model="password" type="password" placeholder="••••••••" required />
        </div>
        <button class="btn btn-primary" :disabled="loading" type="submit">
          <span v-if="!loading">Login</span>
          <span v-else>Logging in…</span>
        </button>
      </form>
      <p v-if="error" style="color: #b91c1c; margin-top: 12px;">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/stores/useAuth';

const router = useRouter();
const auth = useAuth();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function onSubmit() {
  error.value = '';
  loading.value = true;
  const ok = await auth.login(email.value.trim(), password.value);
  loading.value = false;
  if (ok) {
    router.push('/notes');
  } else {
    error.value = 'Invalid credentials. Please try again.';
  }
}
</script>

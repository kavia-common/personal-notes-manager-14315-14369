import { useAuth } from '@/stores/useAuth';

// PUBLIC_INTERFACE
export default defineNuxtRouteMiddleware((to) => {
  /** Protect notes routes: redirect to /login if not authenticated */
  const auth = useAuth();
  if (!auth.user.value && to.path.startsWith('/notes')) {
    return navigateTo('/login');
  }
});

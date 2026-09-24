export default defineNuxtRouteMiddleware(async () => {
  await useAuthStore().init();
});

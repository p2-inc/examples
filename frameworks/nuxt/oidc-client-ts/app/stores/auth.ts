import type { User } from "oidc-client-ts";

export const useAuthStore = defineStore("auth", () => {
  const { $userManager } = useNuxtApp();
  const user = shallowRef<User | null>(null);
  const error = shallowRef<string | null>(null);
  let initialized = false;

  $userManager.events.addUserLoaded((loadedUser) => {
    user.value = loadedUser;
    error.value = null;
  });
  $userManager.events.addUserUnloaded(() => {
    user.value = null;
  });
  $userManager.events.addSilentRenewError((renewError) => {
    error.value = renewError.message;
  });

  async function init() {
    if (initialized) {
      return;
    }
    initialized = true;
    const storedUser = await $userManager.getUser();
    user.value = storedUser && !storedUser.expired ? storedUser : null;
  }

  function signIn() {
    return $userManager.signinRedirect({
      state: { returnTo: window.location.pathname },
    });
  }

  function signOut() {
    return $userManager.signoutRedirect();
  }

  async function handleCallback() {
    const signedInUser = await $userManager.signinCallback();
    const state = signedInUser?.state as { returnTo?: string } | undefined;
    return state?.returnTo ?? "/";
  }

  function handleSilentCallback() {
    return $userManager.signinSilentCallback();
  }

  function setError(authError: unknown) {
    error.value =
      authError instanceof Error ? authError.message : String(authError);
  }

  return {
    user,
    error,
    init,
    signIn,
    signOut,
    handleCallback,
    handleSilentCallback,
    setError,
  };
});

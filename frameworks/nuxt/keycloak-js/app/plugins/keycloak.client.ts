import Keycloak from "keycloak-js";

export default defineNuxtPlugin(async () => {
  const { keycloakUrl, keycloakRealm, keycloakClientId } =
    useRuntimeConfig().public;
  const keycloak = new Keycloak({
    url: keycloakUrl,
    realm: keycloakRealm,
    clientId: keycloakClientId,
  });
  const state = useKeycloakState();

  const sync = () => {
    state.value = {
      ...state.value,
      authenticated: keycloak.authenticated === true,
      tokenParsed: keycloak.tokenParsed,
      idTokenParsed: keycloak.idTokenParsed,
    };
  };

  keycloak.onAuthSuccess = sync;
  keycloak.onAuthRefreshSuccess = sync;
  keycloak.onAuthLogout = sync;
  keycloak.onTokenExpired = () => {
    keycloak.updateToken(30).catch(() => {
      keycloak.clearToken();
      sync();
    });
  };

  try {
    await keycloak.init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      pkceMethod: "S256",
      checkLoginIframe: false,
    });
  } catch (error) {
    state.value = {
      ...state.value,
      error:
        error instanceof Error
          ? error.message
          : "Could not initialize keycloak-js",
    };
  }
  sync();

  return { provide: { keycloak } };
});

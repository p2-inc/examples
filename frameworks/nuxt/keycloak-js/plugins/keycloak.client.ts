import Keycloak, { KeycloakConfig } from "keycloak-js";

export default defineNuxtPlugin((nuxtApp) => {
  const initOptions: KeycloakConfig = {
    url: "https://app.phasetwo.io/auth/",
    realm: "p2examples",
    clientId: "nuxt-example",
  };

  const keycloak = new Keycloak(initOptions);

  nuxtApp.$keycloak = keycloak;

  keycloak.init({
    onLoad: "check-sso",
  });
});

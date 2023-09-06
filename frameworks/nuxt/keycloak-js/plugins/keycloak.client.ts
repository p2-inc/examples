import Keycloak, { KeycloakConfig } from "keycloak-js";

export default defineNuxtPlugin((nuxtApp) => {
  const initOptions: KeycloakConfig = {
    url: "https://euc1.auth.ac/auth/",
    realm: "shared-deployment-001",
    clientId: "reg-example-1",
  };

  const keycloak = new Keycloak(initOptions);

  nuxtApp.$keycloak = keycloak;

  keycloak.init({
    onLoad: "check-sso",
  });
});

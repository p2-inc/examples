import Keycloak, { KeycloakConfig } from "keycloak-js";
import { getCurrentInstance } from "vue";

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

// export default defineNuxtPlugin({
//   name: "$keycloak",
//   parallel: true,
//   async setup(nuxtApp) {
//     const initOptions: KeycloakConfig = {
//       url: "https://euc1.auth.ac/auth/",
//       realm: "shared-deployment-001",
//       clientId: "reg-example-1",
//     };
//     const keycloak = new Keycloak(initOptions);
//     nuxtApp.$keycloak = keycloak;
//     keycloak.init({
//       onLoad: "check-sso",
//     });
//   },
// });

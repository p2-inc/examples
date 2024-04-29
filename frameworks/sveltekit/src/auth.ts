import { SvelteKitAuth } from "@auth/sveltekit";
import Keycloak from "@auth/sveltekit/providers/keycloak";
// import {
//   AUTH_KEYCLOAK_ID,
//   AUTH_KEYCLOAK_ISSUER,
//   AUTH_KEYCLOAK_SECRET,
// } from "$env/static/private";

const realm = "shared-deployment-001";

const kcConfig = {
      issuer: `https://usw2.auth.ac/auth/realms/${realm}`,
      clientId: "reg-example-1",
      clientSecret: "CLIENT_SECRET", // Paste "Client secret" here. Use Environment variables in prod
}

export const { handle, signIn, signOut } = SvelteKitAuth({
  trustHost: true,
  providers: [
    Keycloak(kcConfig),
  ],
});

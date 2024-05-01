import { SvelteKitAuth } from "@auth/sveltekit";
import Keycloak from "@auth/sveltekit/providers/keycloak";
// import {
//   AUTH_KEYCLOAK_ID,
//   AUTH_KEYCLOAK_ISSUER,
//   AUTH_KEYCLOAK_SECRET,
//   AUTH_SECRET
// } from "$env/static/private";

const authjsSecret =
  "f18d48ce9bea32e44b5591b2c89185729d4559435f77ca76872a83a0850563a4"; // Use Environment Variables AUTH_SECRET in prod

const realm = "shared-deployment-001";

const kcConfig = {
  issuer: `https://usw2.auth.ac/auth/realms/${realm}`, // Use Environment Variables AUTH_KEYCLOAK_ISSUER in prod
  clientId: "reg-example-1", // Paste "Client id" here. Use Environment Variables AUTH_KEYCLOAK_ID in prod
  clientSecret: "CLIENT_SECRET", // Paste "Client secret" here. Use Environment Variables AUTH_KEYCLOAK_ISSUER in prod
};

export const { handle, signIn, signOut } = SvelteKitAuth({
  trustHost: true,
  secret: authjsSecret,
  providers: [Keycloak(kcConfig)],
});

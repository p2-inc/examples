import { SvelteKitAuth } from "@auth/sveltekit";
import Keycloak from "@auth/sveltekit/providers/keycloak";
import {
  AUTH_KEYCLOAK_ID,
  AUTH_KEYCLOAK_ISSUER,
  AUTH_KEYCLOAK_SECRET,
} from "$env/static/private";

export const { handle, signIn, signOut } = SvelteKitAuth({
  trustHost: true,
  providers: [
    Keycloak({
      clientId: AUTH_KEYCLOAK_ID,
      issuer: AUTH_KEYCLOAK_ISSUER,
      clientSecret: AUTH_KEYCLOAK_SECRET,
    }),
  ],
});

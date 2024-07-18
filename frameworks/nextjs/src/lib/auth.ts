import { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const authServerUrl = process.env.KEYCLOAK_ISSUER;
const clientId = process.env.KEYCLOAK_ID!;
const clientSecret = process.env.KEYCLOAK_SECRET!;

// Example .env values
// NEXTAUTH_URL=http://localhost:3000 # URL of the Next.js app
// NEXTAUTH_SECRET=<secret> # Client secret from Keycloak client
// KEYCLOAK_ID=nextjs # Keycloak client ID
// KEYCLOAK_SECRET=<secret> # Client secret from Keycloak client
// KEYCLOAK_ISSUER=https://app.phasetwo.io/auth/realms/p2examples # Url of the Keycloak server

export const AuthOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId,
      clientSecret,
      issuer: authServerUrl,
    }),
  ],
};

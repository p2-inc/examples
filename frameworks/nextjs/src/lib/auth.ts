import { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const authServerUrl = "https://euc1.auth.ac/auth/";
const realm = "shared-deployment-001";
const clientId = "reg-example-1";
const clientSecret = "CLIENT_SECRET";

export const AuthOptions: NextAuthOptions = {
  providers: [
    KeycloakProvider({
      clientId,
      clientSecret,
      issuer: `${authServerUrl}realms/${realm}`,
    }),
  ],
};

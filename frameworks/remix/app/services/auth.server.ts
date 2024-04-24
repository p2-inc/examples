import { Authenticator } from "remix-auth";
import { KeycloakStrategy } from "remix-keycloak";
import { sessionStorage } from "~/services/session.server";

export const authenticator = new Authenticator(sessionStorage);

const keycloakStrategy = new KeycloakStrategy(
  {
    useSSL: true,
    domain: "usw2.auth.ac/auth",
    realm: "shared-deployment-001",
    clientID: "reg-example-1",
    clientSecret: "CLIENT_SECRET",
    callbackURL: "http://localhost:3000/auth/keycloak/callback",
  },
  async ({ profile }) => {
    return profile
  }
);

authenticator.use(keycloakStrategy);

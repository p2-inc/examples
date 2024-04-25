import { KeycloakStrategy } from "remix-keycloak";

export default new KeycloakStrategy(
  {
    useSSL: true,
    domain: "usw2.auth.ac/auth",
    realm: "shared-deployment-001",
    clientID: "reg-example-1",
    clientSecret: "CLIENT_SECRET",
    callbackURL: "http://localhost:3000/auth/keycloak/callback",
  },
  async ({ profile }) => profile
);

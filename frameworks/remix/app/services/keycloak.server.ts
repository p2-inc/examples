import { KeycloakStrategy } from "remix-keycloak";

const kcConfig = {
    useSSL: true,
    domain: "usw2.auth.ac/auth",
    realm: "shared-deployment-001",
    clientID: "reg-example-1",
    clientSecret: "CLIENT_SECRET",
    callbackURL: "http://localhost:3000/auth/keycloak/callback",
}

export default new KeycloakStrategy(
  kcConfig,
  ({ profile }) => profile
);

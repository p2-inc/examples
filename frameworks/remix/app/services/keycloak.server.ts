import { KeycloakStrategy } from "remix-keycloak";

const kcConfig = {
  useSSL: true,
  domain: process.env.KEYCLOAK_ISSUER_DOMAIN,
  realm: process.env.KEYCLOAK_REALM,
  clientID: process.env.KEYCLOAK_CLIENT_ID,
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
  callbackURL: process.env.KEYCLOAK_CALLBACK_URL,
};

export default new KeycloakStrategy(kcConfig, ({ profile }) => profile);

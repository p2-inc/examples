export const keycloakConfig = {
  authorityUrl: process.env.KEYCLOAK_ISSUER,
  realm: process.env.KEYCLOAK_REALM,
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
};

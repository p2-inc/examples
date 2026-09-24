import { Authenticator } from "remix-auth";
import { OAuth2Strategy } from "remix-auth-oauth2";
import { requireEnv } from "./env.server";
import { decodeJwtPayload } from "./jwt.server";

export type SessionUser = {
  idToken: string;
  accessTokenClaims: Record<string, unknown>;
};

async function createAuthenticator() {
  const authenticator = new Authenticator<SessionUser>();
  const strategy = await OAuth2Strategy.discover<SessionUser>(
    requireEnv("KEYCLOAK_ISSUER"),
    {
      clientId: requireEnv("KEYCLOAK_CLIENT_ID"),
      clientSecret: requireEnv("KEYCLOAK_CLIENT_SECRET"),
      redirectURI: requireEnv("KEYCLOAK_CALLBACK_URL"),
      scopes: ["openid", "profile", "email"],
    },
    async ({ tokens }) => ({
      idToken: tokens.idToken(),
      accessTokenClaims: decodeJwtPayload(tokens.accessToken()),
    }),
  );
  authenticator.use(strategy, "keycloak");
  return authenticator;
}

let authenticator: Promise<Authenticator<SessionUser>> | undefined;

export function getAuthenticator() {
  authenticator ??= createAuthenticator().catch((error: unknown) => {
    authenticator = undefined;
    throw error;
  });
  return authenticator;
}

let endSessionEndpoint: Promise<string> | undefined;

export function getEndSessionEndpoint() {
  endSessionEndpoint ??= fetch(
    `${requireEnv("KEYCLOAK_ISSUER")}/.well-known/openid-configuration`,
  )
    .then((response) => response.json())
    .then(
      (metadata: { end_session_endpoint: string }) =>
        metadata.end_session_endpoint,
    )
    .catch((error: unknown) => {
      endSessionEndpoint = undefined;
      throw error;
    });
  return endSessionEndpoint;
}

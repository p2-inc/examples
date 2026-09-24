import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";
import { decodeJwtPayload } from "@/lib/jwt";

const issuer = process.env.KEYCLOAK_ISSUER ?? "";
const clientId = process.env.KEYCLOAK_ID ?? "";
const clientSecret = process.env.KEYCLOAK_SECRET ?? "";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  if (!token.refreshToken) {
    return { ...token, error: "RefreshAccessTokenError" };
  }

  const response = await fetch(`${issuer}/protocol/openid-connect/token`, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: token.refreshToken,
    }),
  });

  if (!response.ok) {
    return { ...token, error: "RefreshAccessTokenError" };
  }

  const tokens = await response.json();
  return {
    ...token,
    accessToken: tokens.access_token,
    idToken: tokens.id_token ?? token.idToken,
    refreshToken: tokens.refresh_token ?? token.refreshToken,
    expiresAt: Math.floor(Date.now() / 1000) + tokens.expires_in,
    error: undefined,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [KeycloakProvider({ clientId, clientSecret, issuer })],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          idToken: account.id_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at,
        };
      }

      if (token.expiresAt && Date.now() < (token.expiresAt - 30) * 1000) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      return {
        ...session,
        error: token.error,
        accessTokenClaims: decodeJwtPayload(token.accessToken),
        idTokenClaims: decodeJwtPayload(token.idToken),
      };
    },
  },
  events: {
    async signOut({ token }) {
      if (!token.refreshToken) {
        return;
      }

      await fetch(`${issuer}/protocol/openid-connect/logout`, {
        method: "POST",
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: token.refreshToken,
        }),
      });
    },
  },
};

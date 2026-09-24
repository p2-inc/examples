import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    error?: "RefreshAccessTokenError";
    accessTokenClaims?: Record<string, unknown>;
    idTokenClaims?: Record<string, unknown>;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: "RefreshAccessTokenError";
  }
}

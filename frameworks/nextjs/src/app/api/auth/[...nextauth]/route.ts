import { AuthOptions } from "@/lib/auth";
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface ExtendedSession extends Session {
  accessToken?: string;
  idToken?: string;
  refreshToken?: string;
  expires_at?: number;
  token_type?: string;
}

const handler = NextAuth({
  ...AuthOptions,

  callbacks: {
    async jwt(params) {
      const { token, account } = params;

      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
        token.refreshToken = account.refresh_token;
        token.expires_at = account.expires_at;
        token.token_type = account.token_type;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: JWT;
    }): Promise<ExtendedSession> {
      session.accessToken = token.accessToken as string;
      session.idToken = token.idToken as string;
      session.refreshToken = token.refreshToken as string;
      session.expires_at = token.expires_at as number;
      session.token_type = token.token_type as string;
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };

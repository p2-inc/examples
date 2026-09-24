import { createCookieSessionStorage } from "react-router";
import { requireEnv } from "./env.server";

type SessionData = {
  idToken: string;
  accessTokenClaims: Record<string, unknown>;
};

export const sessionStorage = createCookieSessionStorage<SessionData>({
  cookie: {
    name: "__session",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    secrets: [requireEnv("SESSION_SECRET")],
    maxAge: 60 * 60 * 8,
  },
});

export function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

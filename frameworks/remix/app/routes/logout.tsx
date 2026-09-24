import { redirect } from "react-router";
import { getEndSessionEndpoint } from "~/auth.server";
import { requireEnv } from "~/env.server";
import { getSession, sessionStorage } from "~/sessions.server";
import type { Route } from "./+types/logout";

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request);
  const logoutUrl = new URL(await getEndSessionEndpoint());
  logoutUrl.searchParams.set("client_id", requireEnv("KEYCLOAK_CLIENT_ID"));
  logoutUrl.searchParams.set(
    "post_logout_redirect_uri",
    new URL("/", request.url).href,
  );

  const idToken = session.get("idToken");
  if (idToken) {
    logoutUrl.searchParams.set("id_token_hint", idToken);
  }

  return redirect(logoutUrl.href, {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
}

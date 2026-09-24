import { redirect } from "react-router";
import { getAuthenticator } from "~/auth.server";
import { getSession, sessionStorage } from "~/sessions.server";
import type { Route } from "./+types/auth.keycloak.callback";

export async function loader({ request }: Route.LoaderArgs) {
  const authenticator = await getAuthenticator();
  const user = await authenticator.authenticate("keycloak", request);

  const session = await getSession(request);
  session.set("idToken", user.idToken);
  session.set("accessTokenClaims", user.accessTokenClaims);

  return redirect("/", {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}

import { getAuthenticator } from "~/auth.server";
import type { Route } from "./+types/auth.keycloak";

export async function action({ request }: Route.ActionArgs) {
  const authenticator = await getAuthenticator();
  await authenticator.authenticate("keycloak", request);
}

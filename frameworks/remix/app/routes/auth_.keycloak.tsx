import { ActionFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const action: ActionFunction = ({ request }) => {
  return authenticator.authenticate("keycloak", request);
};

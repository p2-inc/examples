import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = ({ request }) => {
  return authenticator.authenticate("keycloak", request, {
    successRedirect: "/",
    failureRedirect: "/",
  });
};

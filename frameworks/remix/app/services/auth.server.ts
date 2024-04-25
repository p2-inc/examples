import { Authenticator } from "remix-auth";
import keycloakServer from "./keycloak.server";
import { sessionStorage } from "~/services/session.server";

export const authenticator = new Authenticator(sessionStorage);

authenticator.use(keycloakServer);

import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("auth/keycloak", "routes/auth.keycloak.tsx"),
  route("auth/keycloak/callback", "routes/auth.keycloak.callback.tsx"),
  route("logout", "routes/logout.tsx"),
] satisfies RouteConfig;

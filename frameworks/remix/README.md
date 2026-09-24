# Phase Two React Router v7 example (formerly Remix): remix-auth

[🚀 View the deployed example](https://phasetwo-remix-example.vercel.app/)

Remix v2 is now [React Router v7](https://reactrouter.com): this example is the Remix example migrated to React Router's framework mode, rendered on the server and deployed to Vercel. It logs users in with Keycloak through [remix-auth](https://github.com/sergiodxa/remix-auth) and its [OAuth2 strategy](https://github.com/sergiodxa/remix-auth-oauth2), using the authorization code flow with PKCE. Tokens never reach the browser: the ID token is kept in a signed, HTTP-only session cookie and the page only shows decoded claims. It is styled with [Tailwind CSS](https://tailwindcss.com).

- [app/auth.server.ts](./app/auth.server.ts) sets up the remix-auth `Authenticator` with an OAuth2 strategy discovered from the Keycloak realm, and finds Keycloak's end-session endpoint.
- [app/sessions.server.ts](./app/sessions.server.ts) defines the cookie session.
- [app/routes.ts](./app/routes.ts) lists the routes: [`/auth/keycloak`](./app/routes/auth.keycloak.tsx) starts the login, [`/auth/keycloak/callback`](./app/routes/auth.keycloak.callback.tsx) completes it and stores the session, and [`/logout`](./app/routes/logout.tsx) clears the session and ends the Keycloak session.
- [app/routes/home.tsx](./app/routes/home.tsx) loads the claims on the server and shows the Log in / Log out buttons.

## Configuration

Copy [.env.example](./.env.example) to `.env`. It points at the [local Keycloak](../../keycloak/README.md).

| Variable                 | Description                                                             | Local value                                    |
| ------------------------ | ----------------------------------------------------------------------- | ---------------------------------------------- |
| `KEYCLOAK_ISSUER`        | URL of your Keycloak realm                                              | `http://localhost:8080/auth/realms/p2examples` |
| `KEYCLOAK_CLIENT_ID`     | Client ID of a confidential Keycloak client                             | `remix`                                        |
| `KEYCLOAK_CLIENT_SECRET` | Secret of that client                                                   | `remix-local-dev-secret`                       |
| `KEYCLOAK_CALLBACK_URL`  | Callback URL registered in Keycloak                                     | `http://localhost:3000/auth/keycloak/callback` |
| `SESSION_SECRET`         | Random secret that signs the session cookie (`openssl rand -base64 32`) | —                                              |

`.env` is ignored by git; never commit secrets.

For your own realm, create an OpenID Connect client with client authentication on, the standard flow enabled, `http://localhost:3000/*` as valid redirect URI, and `+` as web origin and as valid post logout redirect URI.

## Run it

```sh
pnpm install
pnpm dev
```

Then open <http://localhost:3000>. `pnpm build && pnpm start` runs a production build. `pnpm typecheck`, `pnpm lint` and `pnpm format` are also available.

The React Router v8 future flags are already enabled in [react-router.config.ts](./react-router.config.ts), so the upgrade to v8 is a dependency bump once Vercel's React Router preset supports it.

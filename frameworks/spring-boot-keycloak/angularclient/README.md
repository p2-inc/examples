# Angular client

The Angular single-page app of the [Spring Boot example](../README.md). It logs users in with Keycloak using the authorization code flow with PKCE, through [angular-oauth2-oidc](https://github.com/manfredsteyer/angular-oauth2-oidc), and calls the Spring Boot API with the access token.

- [`src/environments/environment.ts`](./src/environments/environment.ts): Keycloak issuer, client ID and API URL.
- [`src/app/app.config.ts`](./src/app/app.config.ts): configures angular-oauth2-oidc, sends the access token only to the API, and finishes the login when Keycloak redirects back.
- [`src/app/auth/auth.guard.ts`](./src/app/auth/auth.guard.ts): `authGuard` starts the login before opening a route that needs it (`/protected`).
- [`src/app/home/`](./src/app/home): login status, the Log in / Log out buttons, the API calls and the decoded tokens.

Tokens are kept in session storage and refreshed before they expire. Logging out also ends the Keycloak session.

## Run it

Start Keycloak and the API first, as described in the [example's README](../README.md). Then:

```sh
pnpm install
pnpm start
```

Open <http://localhost:4200>. `pnpm build`, `pnpm test`, `pnpm lint`, `pnpm typecheck` and `pnpm format` are also available.

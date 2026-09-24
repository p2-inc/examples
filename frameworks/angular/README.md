# Phase Two Angular example: angular-oauth2-oidc

[🚀 View the deployed example](https://phasetwo-angular-example.vercel.app/)

An Angular 22 app (standalone components, signals, no zone.js) that logs users in with Keycloak using the authorization code flow with PKCE, through [angular-oauth2-oidc](https://github.com/manfredsteyer/angular-oauth2-oidc). It is styled with [Tailwind CSS](https://tailwindcss.com).

- [src/app/auth/auth.config.ts](./src/app/auth/auth.config.ts) holds the OpenID Connect settings, read from the environment files.
- [src/app/app.config.ts](./src/app/app.config.ts) registers angular-oauth2-oidc and completes the login before the app renders (`provideAppInitializer`).
- [src/app/auth/auth.service.ts](./src/app/auth/auth.service.ts) exposes the login state and the decoded tokens as signals, and the `login` / `logout` actions.
- [src/app/user-status](./src/app/user-status) shows the login state, the Log in / Log out buttons and the decoded tokens.

Tokens are kept in session storage and refreshed before they expire. Logging out also ends the Keycloak session.

## Configuration

| File                                                                                         | Used by                                  | Keycloak                                                                                      |
| -------------------------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| [src/environments/environment.ts](./src/environments/environment.ts)                         | production builds (`pnpm build`, Vercel) | the hosted Phase Two demo realm `https://app.phasetwo.io/auth/realms/p2examples`              |
| [src/environments/environment.development.ts](./src/environments/environment.development.ts) | `pnpm start`                             | the [local Keycloak](../../keycloak/README.md) `http://localhost:8080/auth/realms/p2examples` |

Both use the public client `angular`. For your own realm, create an OpenID Connect client with client authentication off, the standard flow enabled, `http://localhost:4200/*` as valid redirect URI, and `+` as web origin and as valid post logout redirect URI, then change the environment files.

## Run it

Start the [local Keycloak](../../keycloak/README.md) first, then:

```sh
pnpm install
pnpm start
```

Open <http://localhost:4200> and log in as `demo` / `demo`. `pnpm build` creates a production build in `dist/angular/browser`. `pnpm test`, `pnpm lint` and `pnpm format` are also available.

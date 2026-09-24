# Phase Two Nuxt example: oidc-client-ts

[🚀 View the deployed example](https://phasetwo-nuxt-oidc-example.vercel.app/)

A Nuxt 4 app, rendered on the client, that logs users in with Keycloak using the authorization code flow with PKCE, through [oidc-client-ts](https://github.com/authts/oidc-client-ts) and a [Pinia](https://pinia.vuejs.org) store. It is styled with [Tailwind CSS](https://tailwindcss.com).

- [app/plugins/oidc.client.ts](./app/plugins/oidc.client.ts) creates the oidc-client-ts `UserManager` from the runtime config.
- [app/stores/auth.ts](./app/stores/auth.ts) keeps the signed-in user and exposes `signIn`, `signOut` and the callback handlers.
- [app/middleware/auth.global.ts](./app/middleware/auth.global.ts) loads the stored user before any page renders.
- [app/pages/auth.vue](./app/pages/auth.vue) completes the login when Keycloak redirects back, and [app/pages/silent-refresh.vue](./app/pages/silent-refresh.vue) handles silent renewals.
- [app/components/UserStatus.vue](./app/components/UserStatus.vue) shows the login state and the Log in / Log out buttons, and [app/components/TokenPanels.vue](./app/components/TokenPanels.vue) decodes the tokens.

Tokens are kept in session storage and refreshed before they expire. Logging out also ends the Keycloak session.

## Configuration

The defaults in [nuxt.config.ts](./nuxt.config.ts) point at the hosted Phase Two demo realm. Override them with environment variables:

| Variable                      | Description                           | Default                                          |
| ----------------------------- | ------------------------------------- | ------------------------------------------------ |
| `NUXT_PUBLIC_OIDC_ISSUER_URI` | URL of your Keycloak realm            | `https://app.phasetwo.io/auth/realms/p2examples` |
| `NUXT_PUBLIC_OIDC_CLIENT_ID`  | Client ID of a public Keycloak client | `nuxt-oidc-client-ts-example`                    |

To use the [local Keycloak](../../../keycloak/README.md) instead, run `cp .env.example .env`.

For your own realm, create an OpenID Connect client with client authentication off, the standard flow enabled, `http://localhost:3000/*` as valid redirect URI, and `+` as web origin and as valid post logout redirect URI.

## Run it

```sh
pnpm install
pnpm dev
```

Then open <http://localhost:3000>. `pnpm build` creates a production build for Vercel. `pnpm typecheck`, `pnpm lint` and `pnpm format` are also available.

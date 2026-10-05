# Phase Two Vue example: oidc-client-ts

[🚀 View the deployed example](https://phasetwo-vue-example.vercel.app/)

A Vue 3 single-page app that logs users in with Keycloak using the authorization code flow with PKCE, through [oidc-client-ts](https://github.com/authts/oidc-client-ts). It is built with [Vite](https://vite.dev), [Vue Router](https://router.vuejs.org) and [Tailwind CSS](https://tailwindcss.com).

- [src/auth.ts](./src/auth.ts) creates the oidc-client-ts `UserManager` from environment variables.
- [src/composables/useAuth.ts](./src/composables/useAuth.ts) keeps the signed-in user in reactive state and exposes `signIn` and `signOut`.
- [src/views/AuthCallbackView.vue](./src/views/AuthCallbackView.vue) completes the login when Keycloak redirects back to `/auth`, and [src/views/SilentRefreshView.vue](./src/views/SilentRefreshView.vue) handles silent renewals on `/silent-refresh`.
- [src/components/UserStatus.vue](./src/components/UserStatus.vue) shows the login state and the Log in / Log out buttons, and [src/components/TokenPanels.vue](./src/components/TokenPanels.vue) decodes the tokens.

Tokens are kept in session storage and refreshed before they expire. Logging out also ends the Keycloak session.

## Configuration

| Variable               | Description                           | Default (`.env`)                                 |
| ---------------------- | ------------------------------------- | ------------------------------------------------ |
| `VITE_OIDC_ISSUER_URI` | URL of your Keycloak realm            | `https://app.phasetwo.io/auth/realms/p2examples` |
| `VITE_OIDC_CLIENT_ID`  | Client ID of a public Keycloak client | `vue-example`                                    |

`.env` points at the hosted Phase Two demo realm. To use the [local Keycloak](../../keycloak/README.md) instead, run `cp .env.local.sample .env.local`.

For your own realm, create an OpenID Connect client with client authentication off, the standard flow enabled, `http://localhost:3000/*` as valid redirect URI, and `+` as web origin and as valid post logout redirect URI.

## Run it

```sh
pnpm install
pnpm dev
```

Then open <http://localhost:3000>. `pnpm build` creates a production build in `dist/`. `pnpm typecheck`, `pnpm lint` and `pnpm format` are also available.

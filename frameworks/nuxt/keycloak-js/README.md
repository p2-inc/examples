# Phase Two Nuxt example: keycloak-js

[🚀 View the deployed example](https://phasetwo-nuxt-keycloakjs-example.vercel.app/)

A Nuxt 4 app, rendered on the client, that logs users in with Keycloak through the official [keycloak-js](https://github.com/keycloak/keycloak-js) adapter, using the authorization code flow with PKCE. It is styled with [Tailwind CSS](https://tailwindcss.com).

- [app/plugins/keycloak.client.ts](./app/plugins/keycloak.client.ts) creates the Keycloak adapter from the runtime config, checks for an existing session with `check-sso` (through [public/silent-check-sso.html](./public/silent-check-sso.html)) and refreshes the token when it expires.
- [app/composables/useKeycloak.ts](./app/composables/useKeycloak.ts) exposes the reactive login state and the `login` / `logout` actions.
- [app/components/UserStatus.vue](./app/components/UserStatus.vue) shows the login state and the Log in / Log out buttons, and [app/components/TokenPanels.vue](./app/components/TokenPanels.vue) shows the decoded tokens.

Logging out also ends the Keycloak session.

## Configuration

The defaults in [nuxt.config.ts](./nuxt.config.ts) point at the hosted Phase Two demo realm. Override them with environment variables:

| Variable                         | Description                           | Default                        |
| -------------------------------- | ------------------------------------- | ------------------------------ |
| `NUXT_PUBLIC_KEYCLOAK_URL`       | URL of your Keycloak server           | `https://app.phasetwo.io/auth` |
| `NUXT_PUBLIC_KEYCLOAK_REALM`     | Realm name                            | `p2examples`                   |
| `NUXT_PUBLIC_KEYCLOAK_CLIENT_ID` | Client ID of a public Keycloak client | `nuxt-example`                 |

To use the [local Keycloak](../../../keycloak/README.md) instead, run `cp .env.example .env`.

For your own realm, create an OpenID Connect client with client authentication off, the standard flow enabled, `http://localhost:3000/*` as valid redirect URI, and `+` as web origin and as valid post logout redirect URI.

## Run it

```sh
pnpm install
pnpm dev
```

Then open <http://localhost:3000>. `pnpm build` creates a production build for Vercel. `pnpm typecheck`, `pnpm lint` and `pnpm format` are also available.

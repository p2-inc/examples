# Phase Two React example: react-oidc-context + oidc-client-ts

[🚀 View the deployed example](https://phasetwo-react-example.vercel.app/)

A React single-page app that logs users in with Keycloak using the authorization code flow with PKCE, through [react-oidc-context](https://github.com/authts/react-oidc-context) and [oidc-client-ts](https://github.com/authts/oidc-client-ts). It is built with [Vite](https://vite.dev) and [Tailwind CSS](https://tailwindcss.com).

- [src/main.tsx](./src/main.tsx) configures the `AuthProvider` from environment variables.
- [src/Auth.tsx](./src/Auth.tsx) shows the login state and the Log in / Log out buttons.
- [src/components/token.component.tsx](./src/components/token.component.tsx) decodes the access and ID tokens.

Tokens are kept in session storage and refreshed before they expire. Logging out also ends the Keycloak session.

## Configuration

| Variable               | Description                           | Default (`.env`)                                 |
| ---------------------- | ------------------------------------- | ------------------------------------------------ |
| `VITE_OIDC_ISSUER_URI` | URL of your Keycloak realm            | `https://app.phasetwo.io/auth/realms/p2examples` |
| `VITE_OIDC_CLIENT_ID`  | Client ID of a public Keycloak client | `reactjs-example`                                |

`.env` points at the hosted Phase Two demo realm. To use the [local Keycloak](../../../keycloak/README.md) instead, run `cp .env.local.sample .env.local`.

For your own realm, create an OpenID Connect client with client authentication off, the standard flow enabled, `http://localhost:3000/*` as valid redirect URI, and `+` as web origin and as valid post logout redirect URI.

## Run it

```sh
pnpm install
pnpm dev
```

Then open <http://localhost:3000>. `pnpm build` creates a production build in `dist/`. `pnpm typecheck`, `pnpm lint` and `pnpm format` are also available.

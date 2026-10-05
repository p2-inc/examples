# Phase Two React example: oidc-spa

[🚀 View the deployed example](https://phasetwo-react-oidcspa-example.vercel.app/)

A React single-page app that logs users in with Keycloak through [oidc-spa](https://www.oidc-spa.dev/), the library Phase Two uses in its own dashboards. It is built with [Vite](https://vite.dev) and [Tailwind CSS](https://tailwindcss.com). The tutorial [Securing Keycloak with OIDC SPA and Phase Two](https://phasetwo.io/blog/keycloak-oidc-spa-phasetwo) builds this example step by step, starting from [oidc-spa-starter](../oidc-spa-starter).

- [src/oidc.ts](./src/oidc.ts) creates the oidc-spa utilities (`useOidc`, `getOidc`, `OidcInitializationGate`), bootstraps them from environment variables, and exports `fetchWithAuth` to call your APIs with the user's access token.
- [vite.config.ts](./vite.config.ts) adds the oidc-spa Vite plugin, which starts oidc-spa before the app loads and hardens the page against token theft.
- [src/Auth.tsx](./src/Auth.tsx) shows the login state, the Log in / Log out buttons and a link to the Keycloak account console.
- [src/components/token.component.tsx](./src/components/token.component.tsx) shows the decoded tokens, and [src/components/auto-logout-warning-overlay.tsx](./src/components/auto-logout-warning-overlay.tsx) warns before an idle session expires.

## Configuration

| Variable               | Description                                                 | Default (`.env`)                                 |
| ---------------------- | ----------------------------------------------------------- | ------------------------------------------------ |
| `VITE_OIDC_ISSUER_URI` | URL of your Keycloak realm                                  | `https://app.phasetwo.io/auth/realms/p2examples` |
| `VITE_OIDC_CLIENT_ID`  | Client ID of a public Keycloak client                       | `reactjs-example`                                |
| `VITE_OIDC_USE_MOCK`   | `true` to run without Keycloak, with a mock user            | `false`                                          |
| `VITE_OIDC_SPA_DEBUG`  | `true` to log oidc-spa's initialization and token lifecycle | `false`                                          |

`.env` points at the hosted Phase Two demo realm. To use the [local Keycloak](../../../keycloak/README.md) instead, run `cp .env.local.sample .env.local`.

For your own realm, create an OpenID Connect client with client authentication off, the standard flow enabled, `http://localhost:3000/*` as valid redirect URI, and `+` as web origin and as valid post logout redirect URI.

## Run it

```sh
pnpm install
pnpm dev
```

Then open <http://localhost:3000>. Run `VITE_OIDC_USE_MOCK=true pnpm dev` to try it without a Keycloak. `pnpm build` creates a production build in `dist/`. `pnpm typecheck`, `pnpm lint` and `pnpm format` are also available.

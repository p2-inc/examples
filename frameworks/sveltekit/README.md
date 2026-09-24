# Phase Two SvelteKit example: Auth.js

[🚀 View the deployed example](https://phasetwo-sveltekit-example.vercel.app/)

A SvelteKit app (Svelte 5) that logs users in with Keycloak through [Auth.js](https://authjs.dev/reference/sveltekit) (`@auth/sveltekit`) and its Keycloak provider. The login runs on the server: tokens stay in an encrypted, HTTP-only session cookie and the browser only sees decoded claims. It is styled with [Tailwind CSS](https://tailwindcss.com) and deploys to Vercel.

- [src/auth.ts](./src/auth.ts) configures Auth.js: the Keycloak provider, refreshing the access token before it expires, the session content, and ending the Keycloak session on logout.
- [src/hooks.server.ts](./src/hooks.server.ts) adds Auth.js to every request, and [src/routes/+layout.server.ts](./src/routes/+layout.server.ts) loads the session.
- [src/routes/signin](./src/routes/signin/+page.server.ts) and [src/routes/signout](./src/routes/signout/+page.server.ts) are the form actions behind the Log in / Log out buttons in [src/lib/components/UserStatus.svelte](./src/lib/components/UserStatus.svelte).

## Configuration

Copy [.env.example](./.env.example) to `.env`. It points at the [local Keycloak](../../keycloak/README.md). Auth.js reads these variables at runtime.

| Variable               | Description                                                         | Local value                                    |
| ---------------------- | ------------------------------------------------------------------- | ---------------------------------------------- |
| `AUTH_SECRET`          | Random secret that encrypts the session (`openssl rand -base64 32`) | —                                              |
| `AUTH_KEYCLOAK_ID`     | Client ID of a confidential Keycloak client                         | `sveltekit`                                    |
| `AUTH_KEYCLOAK_SECRET` | Secret of that client                                               | `sveltekit-local-dev-secret`                   |
| `AUTH_KEYCLOAK_ISSUER` | URL of your Keycloak realm                                          | `http://localhost:8080/auth/realms/p2examples` |

`.env` is ignored by git; never commit secrets.

For your own realm, create an OpenID Connect client with client authentication on, the standard flow enabled, `http://localhost:3000/*` as valid redirect URI, and `+` as web origin and as valid post logout redirect URI.

## Run it

```sh
pnpm install
pnpm dev
```

Then open <http://localhost:3000>. `pnpm build` creates a production build for Vercel. `pnpm typecheck`, `pnpm lint` and `pnpm format` are also available.

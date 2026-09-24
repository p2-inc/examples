# Phase Two Next.js example: NextAuth.js

[🚀 View the deployed example](https://phasetwo-nextjs-example.vercel.app/)

A Next.js 16 app (App Router) that logs users in with Keycloak through [NextAuth.js](https://next-auth.js.org) and its Keycloak provider. The login runs on the server: tokens stay in an encrypted, HTTP-only session cookie and the browser only sees decoded claims. It is styled with [Tailwind CSS](https://tailwindcss.com).

- [src/auth.ts](./src/auth.ts) holds the NextAuth.js options: the Keycloak provider, refreshing the access token before it expires, the session content, and ending the Keycloak session on logout.
- [src/app/api/auth/[...nextauth]/route.ts](./src/app/api/auth/[...nextauth]/route.ts) mounts NextAuth.js.
- [src/app/page.tsx](./src/app/page.tsx) reads the session on the server with `getServerSession`, and [src/components/buttons.components.tsx](./src/components/buttons.components.tsx) has the Log in / Log out buttons.

## Configuration

Copy [.env.example](./.env.example) to `.env`. It points at the [local Keycloak](../../keycloak/README.md).

| Variable          | Description                                                                | Local value                                    |
| ----------------- | -------------------------------------------------------------------------- | ---------------------------------------------- |
| `NEXTAUTH_URL`    | Public URL of the app                                                      | `http://localhost:3000`                        |
| `NEXTAUTH_SECRET` | Random secret that encrypts the session cookie (`openssl rand -base64 32`) | —                                              |
| `KEYCLOAK_ID`     | Client ID of a confidential Keycloak client                                | `nextjs`                                       |
| `KEYCLOAK_SECRET` | Secret of that client                                                      | `nextjs-local-dev-secret`                      |
| `KEYCLOAK_ISSUER` | URL of your Keycloak realm                                                 | `http://localhost:8080/auth/realms/p2examples` |

`NEXTAUTH_SECRET` is not the Keycloak client secret: generate your own random value. `.env` is ignored by git; never commit secrets.

For your own realm, create an OpenID Connect client with client authentication on, the standard flow enabled, `http://localhost:3000/*` as valid redirect URI, and `+` as web origin and as valid post logout redirect URI.

## Run it

```sh
pnpm install
pnpm dev
```

Then open <http://localhost:3000>. `pnpm build && pnpm start` runs a production build. `pnpm typecheck`, `pnpm lint` and `pnpm format` are also available.

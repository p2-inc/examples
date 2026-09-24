# Phase Two multitenant example: Keycloak Organizations

Two React apps, **Zoo** and **Aquarium**, share one Keycloak realm and use [Phase Two Organizations](https://phasetwo.io/product/organizations/) for multi-tenancy:

- each **organization** is a tenant (`california`, `newyork`);
- each organization has one **role per app** (`zoo`, `aquarium`);
- users are **members** of the organizations they belong to, and the roles they hold in an organization decide which apps they can use for that tenant.

Both apps log users in with [oidc-spa](https://www.oidc-spa.dev/) and call the Organizations API endpoint [`GET /{realm}/orgs/me`](https://phasetwo.io/api/get-me/) with the user's access token. They list the user's organizations with their roles, and show for each one whether it gives access to the current app.

The tutorial [Implement Multi-Tenancy Applications with Keycloak Organizations](https://phasetwo.io/blog/multi-tenancy-with-keycloak-organizations) explains the concepts and the Keycloak setup.

## What's inside

This is an [Nx](https://nx.dev) workspace with two apps and three libraries:

| Path                                                         | What it is                                                                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| [`apps/zoo`](./apps/zoo), [`apps/aquarium`](./apps/aquarium) | The two apps, built with Vite, React 19 and Tailwind CSS 4. Each one has its own Keycloak client. |
| [`libs/api-manager`](./libs/api-manager)                     | `createOrgsApi()`, which calls the Organizations API with a fresh access token on every request.  |
| [`libs/phasetwo-orgs-api`](./libs/phasetwo-orgs-api)         | The Organizations API client, generated from the Phase Two OpenAPI spec.                          |
| [`libs/ui-shared`](./libs/ui-shared)                         | The page both apps share: layout, footer, icons and the organization cards.                       |

In each app:

- `src/oidc.ts` creates the oidc-spa utilities (`useOidc`, `getOidc`, `OidcInitializationGate`) and bootstraps them from the environment variables below.
- `vite.config.ts` adds the oidc-spa Vite plugin, which starts oidc-spa before the app loads and hardens the page against token theft.
- `src/orgs-api.ts` creates the Organizations API client. It gets the access token from oidc-spa for each request, so the token is always fresh.
- `src/app/auth.tsx` shows the login state, the Log in / Log out buttons and the organizations. `appRole` is the organization role that grants access to the app.

The apps import the libraries from source through the path aliases in [`tsconfig.base.json`](./tsconfig.base.json) (`@multitenant/api-manager`, `@multitenant/phasetwo-orgs-api`, `@multitenant/ui-shared`), which Vite resolves with `resolve.tsconfigPaths`. The libraries have no build step of their own.

## Run it with the local Keycloak

You need Node.js 24, pnpm and Docker. From the repository root, start the [local Phase Two Keycloak](../keycloak/README.md) with the demo organizations:

```sh
docker compose -f keycloak/docker-compose.yml --profile orgs up -d --wait
```

Then, in this folder:

```sh
pnpm install
pnpm dev
```

`pnpm dev` starts both apps: Zoo on <http://localhost:4200> and Aquarium on <http://localhost:4201>. `pnpm dev:zoo` and `pnpm dev:aquarium` start only one.

Log in as `jane` / `jane` or `jacques` / `jacques` in each app to see the difference. Both users are members of both organizations, but they don't have the same roles:

| User      | California | New York          |
| --------- | ---------- | ----------------- |
| `jane`    | `zoo`      | `zoo`, `aquarium` |
| `jacques` | `aquarium` | `aquarium`        |

Jane can use Zoo for both tenants and Aquarium only for New York. Jacques can use Aquarium for both tenants and Zoo for neither.

## Configuration

Each app reads its settings from its own `.env`:

| Variable               | Description                                                                                                 | Default                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `VITE_OIDC_ISSUER_URI` | URL of your Keycloak realm. The Organizations API URL and the realm name are derived from it.               | `http://localhost:8080/auth/realms/p2examples`               |
| `VITE_OIDC_CLIENT_ID`  | Client ID of the app's public Keycloak client                                                               | `zoo` in `apps/zoo/.env`, `aquarium` in `apps/aquarium/.env` |
| `VITE_OIDC_USE_MOCK`   | `true` to replace Keycloak with a mock user, as the tests do. The organizations still need a real Keycloak. | `false`                                                      |
| `VITE_OIDC_SPA_DEBUG`  | `true` to log oidc-spa's initialization and token lifecycle                                                 | `false`                                                      |

`.env` points at the local Keycloak, which has the clients and organizations this example needs. To use another realm, copy `.env.local.sample` to `.env.local` in each app and edit it. `.env.local` is ignored by git.

## Commands

Run them in this folder. They go through Nx, which runs the target in every project that has it and caches the results.

| Command                  | What it does                                                             |
| ------------------------ | ------------------------------------------------------------------------ |
| `pnpm dev`               | Starts both apps in development mode                                     |
| `pnpm build`             | Builds both apps into `dist/apps/zoo` and `dist/apps/aquarium`           |
| `pnpm preview`           | Builds both apps and serves the production builds on ports 4200 and 4201 |
| `pnpm typecheck`         | Type-checks every project, tests and Vite configs included               |
| `pnpm lint`              | Lints every project with Nx's ESLint flat configs                        |
| `pnpm test`              | Runs the Vitest tests of every project                                   |
| `pnpm format`            | Formats the workspace with Prettier                                      |
| `pnpm generate:orgs-api` | Regenerates the Organizations API client (see below)                     |

Nx can also run a single target of a single project, for example `pnpm nx test ui-shared` or `pnpm nx build zoo`. `pnpm nx show project zoo` lists the targets of a project: Nx infers them from its `vite.config.ts`, `eslint.config.mjs` and `tsconfig.json`.

The tests don't need Keycloak. The apps render with oidc-spa's mock (`VITE_OIDC_USE_MOCK=true`, set in the `test` section of each `vite.config.ts`), `api-manager` checks the requests sent to the Organizations API, and `ui-shared` renders the organization cards with sample data.

## Regenerate the Organizations API client

`libs/phasetwo-orgs-api/src/lib` is generated with [OpenAPI Generator](https://openapi-generator.tech) from the [Phase Two OpenAPI spec](https://raw.githubusercontent.com/p2-inc/phasetwo-docs/refs/heads/main/openapi.yaml). To regenerate it, with Java 11 or newer installed:

```sh
pnpm generate:orgs-api
```

The generator version and options live in [`openapitools.json`](./openapitools.json). [`libs/phasetwo-orgs-api/README.md`](./libs/phasetwo-orgs-api/README.md) explains them.

## Use your own realm

Your Keycloak needs the [Phase Two Organizations extension](https://github.com/p2-inc/keycloak-orgs). It is included in [Phase Two's hosted Keycloak](https://phasetwo.io/hosting/) and in the [Phase Two Keycloak image](https://github.com/p2-inc/phasetwo-containers).

1. Create two OpenID Connect clients, `zoo` and `aquarium`, with client authentication off, the standard flow enabled and `S256` as PKCE method. Set `http://localhost:4200/*` (Zoo) or `http://localhost:4201/*` (Aquarium) as valid redirect URI, and `+` as web origin and as valid post logout redirect URI. The `+` web origin lets the browser call Keycloak's token endpoint and the Organizations API from the app.
2. Create your organizations, for example `california` and `newyork`, each with the roles `zoo` and `aquarium`.
3. Add your users as members of the organizations, and grant each of them the roles of the apps they may use there.
4. In each app, copy `.env.local.sample` to `.env.local` and set your realm's issuer URI and the client ID.

[`keycloak/seed/seed-orgs.mjs`](../keycloak/seed/seed-orgs.mjs) automates steps 2 and 3 for the local Keycloak with the Organizations API, and you can adapt it to your realm. The role that grants access to an app is `appRole` in `apps/*/src/app/auth.tsx`.

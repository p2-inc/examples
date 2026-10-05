# Local Phase Two Keycloak

A throwaway [Phase Two Keycloak](https://github.com/p2-inc/phasetwo-containers) with a `p2examples` realm, so every example in this repo can be run end to end on your machine. The realm uses the same client IDs as the hosted demo realm (`https://app.phasetwo.io/auth/realms/p2examples`), so switching an example between the two only changes its issuer URL (and, for server-side examples, the client secret).

## Start and stop

Run these from the repository root. You need Docker with the Compose plugin; the standalone `docker-compose` command works the same way.

```sh
docker compose -f keycloak/docker-compose.yml up -d --wait                  # Keycloak + realm
docker compose -f keycloak/docker-compose.yml --profile orgs up -d --wait   # ...plus demo organizations (for /multitenant)
docker compose -f keycloak/docker-compose.yml down                          # stop; everything is reset
```

| What                                    | Value                                                   |
| --------------------------------------- | ------------------------------------------------------- |
| Issuer (use in the examples' env files) | `http://localhost:8080/auth/realms/p2examples`          |
| Admin console                           | http://localhost:8080/auth/admin — `admin` / `admin`    |
| Demo users                              | `demo` / `demo`, `jane` / `jane`, `jacques` / `jacques` |

Nothing is persisted: `down` followed by `up` gives you a fresh realm, re-imported from [`realms/p2examples.json`](./realms/p2examples.json).

## Clients

Every client allows its local redirect URIs, `+` as web origin (CORS for the redirect URIs' origins) and `+` as post-logout redirect URIs. Public clients require PKCE (S256).

| Client ID                     | Type            | Local redirect URIs                                  | Used by                          |
| ----------------------------- | --------------- | ---------------------------------------------------- | -------------------------------- |
| `reactjs-example`             | public          | `http://localhost:3000/*`                            | `frameworks/reactjs/*`           |
| `vue-example`                 | public          | `http://localhost:3000/*`                            | `frameworks/vue`                 |
| `nuxt-example`                | public          | `http://localhost:3000/*`                            | `frameworks/nuxt/keycloak-js`    |
| `nuxt-oidc-client-ts-example` | public          | `http://localhost:3000/*`                            | `frameworks/nuxt/oidc-client-ts` |
| `angular`                     | public          | `http://localhost:4200/*`                            | `frameworks/angular`             |
| `zoo`                         | public          | `http://localhost:4200/*`                            | `multitenant/apps/zoo`           |
| `aquarium`                    | public          | `http://localhost:4201/*`                            | `multitenant/apps/aquarium`      |
| `nextjs`                      | confidential    | `http://localhost:3000/*`                            | `frameworks/nextjs`              |
| `remix`                       | confidential    | `http://localhost:3000/*`                            | `frameworks/remix`               |
| `sveltekit`                   | confidential    | `http://localhost:3000/*`                            | `frameworks/sveltekit`           |
| `django`                      | confidential    | `http://localhost:8000/*`, `http://127.0.0.1:8000/*` | `frameworks/django`              |
| `seed-cli`                    | service account | —                                                    | `seed/seed-orgs.mjs`             |

Confidential clients use the secret `<client-id>-local-dev-secret` (for example `nextjs-local-dev-secret`). **These secrets, and the demo passwords, exist only for this local container.** Never reuse them anywhere else.

The Spring Boot and SAML examples keep their own Keycloak setup (`frameworks/spring-boot-keycloak/docker-compose.yml` on port 8888, `saml2/idp-initiated`), because their tutorials use different realms.

## Organizations (for `/multitenant`)

The `orgs` profile runs [`seed/seed-orgs.mjs`](./seed/seed-orgs.mjs) once Keycloak is healthy. It uses the Phase Two Organizations API to create the setup from [Implement Multi-Tenancy Applications with Keycloak Organizations](https://phasetwo.io/blog/multi-tenancy-with-keycloak-organizations):

| Organization | `jane`            | `jacques`  |
| ------------ | ----------------- | ---------- |
| `california` | `zoo`             | `aquarium` |
| `newyork`    | `zoo`, `aquarium` | `aquarium` |

Both users are members of both organizations; the roles decide which app (zoo or aquarium) they can use in each tenant. The script can also run on the host: `KEYCLOAK_URL=http://localhost:8080/auth node keycloak/seed/seed-orgs.mjs`.

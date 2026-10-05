# Phase Two Framework Examples

This is a repo for code examples showing how to integrate Keycloak with various frameworks. Every example is a standalone project: copy its folder and it runs on its own.

## Frameworks

| Framework                                    |                     Code                      |                             Live                             |                                          Tutorial                                           | Local port  |
| -------------------------------------------- | :-------------------------------------------: | :----------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :---------: |
| React (oidc-client-ts)                       |  [🧑‍💻📁](./frameworks/reactjs/oidc-client-ts)  |      [👩‍💻🚀](https://phasetwo-react-example.vercel.app)       |        [👩‍🏫](https://phasetwo.io/blog/instant-user-managemenet-and-sso-for-reactjs/)         |    3000     |
| React (oidc-spa)                             |     [🧑‍💻📁](./frameworks/reactjs/oidc-spa)     |  [👩‍💻🚀](https://phasetwo-react-oidcspa-example.vercel.app/)  |                  [👩‍🏫](https://phasetwo.io/blog/keycloak-oidc-spa-phasetwo)                  |    3000     |
| React (oidc-spa tutorial starter)            | [🧑‍💻📁](./frameworks/reactjs/oidc-spa-starter) |                              —                               |                  [👩‍🏫](https://phasetwo.io/blog/keycloak-oidc-spa-phasetwo)                  |    3000     |
| Next.js (NextAuth.js)                        |         [🧑‍💻📁](./frameworks/nextjs/)          |      [👩‍💻🚀](https://phasetwo-nextjs-example.vercel.app)      |         [👩‍🏫](https://phasetwo.io/blog/instant-user-managemenet-and-sso-for-nextjs/)         |    3000     |
| React Router v7, formerly Remix (remix-auth) |          [🧑‍💻📁](./frameworks/remix/)          |      [👩‍💻🚀](https://phasetwo-remix-example.vercel.app)       |          [👩‍🏫](https://phasetwo.io/blog/instant-user-management-and-sso-for-remix/)          |    3000     |
| Vue (oidc-client-ts)                         |           [🧑‍💻📁](./frameworks/vue/)           |       [👩‍💻🚀](https://phasetwo-vue-example.vercel.app)        |          [👩‍🏫](https://phasetwo.io/blog/instant-user-managemenet-and-sso-for-vue/)           |    3000     |
| Nuxt (keycloak-js)                           |    [🧑‍💻📁](./frameworks/nuxt/keycloak-js/)     | [👩‍💻🚀](https://phasetwo-nuxt-keycloakjs-example.vercel.app/) |          [👩‍🏫](https://phasetwo.io/blog/instant-user-managemenet-and-sso-for-nuxt/)          |    3000     |
| Nuxt (oidc-client-ts)                        |   [🧑‍💻📁](./frameworks/nuxt/oidc-client-ts/)   |    [👩‍💻🚀](https://phasetwo-nuxt-oidc-example.vercel.app/)    |          [👩‍🏫](https://phasetwo.io/blog/instant-user-managemenet-and-sso-for-nuxt/)          |    3000     |
| SvelteKit (Auth.js)                          |        [🧑‍💻📁](./frameworks/sveltekit/)        |    [👩‍💻🚀](https://phasetwo-sveltekit-example.vercel.app)     |        [👩‍🏫](https://phasetwo.io/blog/instant-user-management-and-sso-for-sveltekit/)        |    3000     |
| Angular (angular-oauth2-oidc)                |         [🧑‍💻📁](./frameworks/angular/)         |     [👩‍💻🚀](https://phasetwo-angular-example.vercel.app)      |         [👩‍🏫](https://phasetwo.io/blog/instant-user-management-and-sso-for-angular/)         |    4200     |
| Django (mozilla-django-oidc)                 |         [🧑‍💻📁](./frameworks/django/)          |                             👩‍💻⚒️                             |                        [👩‍🏫](https://phasetwo.io/blog/secure-django/)                        |    8000     |
| Spring Boot + Angular                        |  [🧑‍💻📁](./frameworks/spring-boot-keycloak/)   |                             👩‍💻⚒️                             |                     [👩‍🏫](https://phasetwo.io/blog/secure-spring-boot/)                      | 8080 / 4200 |
| SAML IdP-initiated SSO (Spring Boot)         |        [🧑‍💻📁](./saml2/idp-initiated/)         |                             👩‍💻⚒️                             | [👩‍🏫](https://phasetwo.io/blog/keycloak-saml-identity-provider-idp-initiated-flow-with-okta) |    8081     |

## Multi-tenant

[Demo Apps](./multitenant/README.md) to be used as a starting point for a multi-tenant setup with [Phase Two Organizations](https://phasetwo.io/docs/organizations/). Uses `nx` to manage the apps and `oidc-spa`. Tutorial: [Implement Multi-Tenancy Applications with Keycloak Organizations](https://phasetwo.io/blog/multi-tenancy-with-keycloak-organizations).

## Build status

| Example                                      | Status                                                                                                                                                                                                           |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React (oidc-client-ts)                       | [![React (oidc-client-ts)](https://github.com/p2-inc/examples/actions/workflows/react-oidc.yml/badge.svg)](https://github.com/p2-inc/examples/actions/workflows/react-oidc.yml)                                  |
| React (oidc-spa)                             | [![React (oidc-spa)](https://github.com/p2-inc/examples/actions/workflows/react-oidcspa.yml/badge.svg)](https://github.com/p2-inc/examples/actions/workflows/react-oidcspa.yml)                                  |
| React (oidc-spa tutorial starter)            | [![React (oidc-spa tutorial starter)](https://github.com/p2-inc/examples/actions/workflows/react-oidcspa-starter.yml/badge.svg)](https://github.com/p2-inc/examples/actions/workflows/react-oidcspa-starter.yml) |
| Next.js (NextAuth.js)                        | [![Next.js (NextAuth.js)](https://github.com/p2-inc/examples/actions/workflows/nextjs.yml/badge.svg)](https://github.com/p2-inc/examples/actions/workflows/nextjs.yml)                                           |
| React Router v7, formerly Remix (remix-auth) | [![React Router v7, formerly Remix (remix-auth)](https://github.com/p2-inc/examples/actions/workflows/remix.yml/badge.svg)](https://github.com/p2-inc/examples/actions/workflows/remix.yml)                      |
| Vue (oidc-client-ts)                         | [![Vue (oidc-client-ts)](https://github.com/p2-inc/examples/actions/workflows/vue.yml/badge.svg)](https://github.com/p2-inc/examples/actions/workflows/vue.yml)                                                  |
| Nuxt (keycloak-js)                           | [![Nuxt (keycloak-js)](https://github.com/p2-inc/examples/actions/workflows/nuxt-keycloakjs.yml/badge.svg)](https://github.com/p2-inc/examples/actions/workflows/nuxt-keycloakjs.yml)                            |
| Nuxt (oidc-client-ts)                        | [![Nuxt (oidc-client-ts)](https://github.com/p2-inc/examples/actions/workflows/nuxt-oidc.yml/badge.svg)](https://github.com/p2-inc/examples/actions/workflows/nuxt-oidc.yml)                                     |
| SvelteKit (Auth.js)                          | [![SvelteKit (Auth.js)](https://github.com/p2-inc/examples/actions/workflows/sveltekit.yml/badge.svg)](https://github.com/p2-inc/examples/actions/workflows/sveltekit.yml)                                       |
| Angular (angular-oauth2-oidc)                | [![Angular (angular-oauth2-oidc)](https://github.com/p2-inc/examples/actions/workflows/angular.yml/badge.svg)](https://github.com/p2-inc/examples/actions/workflows/angular.yml)                                 |
| Django (mozilla-django-oidc)                 | [![Django (mozilla-django-oidc)](https://github.com/p2-inc/examples/actions/workflows/django.yml/badge.svg)](https://github.com/p2-inc/examples/actions/workflows/django.yml)                                    |
| Spring Boot + Angular                        | [![Spring Boot + Angular](https://github.com/p2-inc/examples/actions/workflows/spring-boot-keycloak.yml/badge.svg)](https://github.com/p2-inc/examples/actions/workflows/spring-boot-keycloak.yml)               |
| SAML IdP-initiated SSO (Spring Boot)         | [![SAML IdP-initiated SSO (Spring Boot)](https://github.com/p2-inc/examples/actions/workflows/saml2-idp-initiated.yml/badge.svg)](https://github.com/p2-inc/examples/actions/workflows/saml2-idp-initiated.yml)  |
| Multi-tenant (Nx)                            | [![Multi-tenant (Nx)](https://github.com/p2-inc/examples/actions/workflows/multitenant.yml/badge.svg)](https://github.com/p2-inc/examples/actions/workflows/multitenant.yml)                                     |

## Running an example

Each example's README has its exact steps. They all need:

- [Node.js 24](https://nodejs.org/) (see `.nvmrc`) and [pnpm](https://pnpm.io/), for the JavaScript examples. With Corepack (`corepack enable`), the pnpm version pinned in each `package.json` is used automatically.
- Python 3.13+ for Django, and a JDK for the Spring Boot examples (Gradle downloads JDK 21 if needed).
- A Keycloak to log in against, either:
  - **the hosted demo realm** `https://app.phasetwo.io/auth/realms/p2examples`, which the live demos use, or
  - **a local Phase Two Keycloak**: `docker compose -f keycloak/docker-compose.yml up -d --wait` starts one with a pre-configured `p2examples` realm and demo users. See [keycloak/README.md](./keycloak/README.md). Each example has a sample env file for it.

To use your own [Phase Two](https://phasetwo.io) or Keycloak instance, create the client described in the example's README and point the example at your realm.

## Github Actions

Every example has a workflow in [.github/workflows](./.github/workflows) that builds it on pull requests. The examples with a live demo are also deployed to Vercel: a preview deployment for pull requests and a production deployment for `main`. Deployments need the `VERCEL_ORG_ID`, `VERCEL_DEPLOYMENT_TOKEN` and `VERCEL_<EXAMPLE>_PROJECT_ID` secrets, and are skipped for forks and Dependabot pull requests. Feel free to use, disable, or remove as desired.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the conventions the examples follow.

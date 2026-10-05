# Contributing

Examples are read, copied and pasted more than they are run, so they favour clarity over cleverness and follow the same conventions as Phase Two's own apps.

## Structure

- One standalone folder per example. Nothing is shared between examples at build time: each has its own lockfile, config and assets, so copying the folder is enough to run it.
- Keep folder paths stable. The tutorials on [phasetwo.io](https://phasetwo.io/blog) link to them.
- Each example has its own workflow in `.github/workflows`, which calls the shared `_node-ci.yml`, `_vercel-deploy.yml` or `_gradle-ci.yml`. Its `paths` filter lists the example folder and the workflow file itself.

## JavaScript and TypeScript examples

| Topic           | Convention                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| Runtime         | Node.js 24: `.nvmrc` and `"engines": { "node": "24.x" }`                                                    |
| Package manager | pnpm, pinned with `"packageManager"`. Only `pnpm-lock.yaml` is committed.                                   |
| Language        | TypeScript, `strict`, the framework's own tsconfig                                                          |
| Scripts         | `dev`, `build`, `preview` or `start`, `typecheck`, `lint`, `format`, and `test` when there are tests        |
| Styling         | Tailwind CSS 4, configured in CSS (`@import "tailwindcss"` and an `@theme` block). No `tailwind.config.js`. |
| Lint and format | ESLint flat config from the framework's preset, Prettier with `prettier-plugin-tailwindcss`                 |
| Configuration   | Public settings in env files; secrets only in the environment, never in git                                 |

Environment variables:

- Vite SPAs commit a `.env` with the public settings of the hosted demo realm (`VITE_OIDC_ISSUER_URI`, `VITE_OIDC_CLIENT_ID`) and a `.env.local.sample` for the local Keycloak. Copy it to `.env.local`, which is ignored by git.
- Server-side examples commit only `.env.example`, pointing at the local Keycloak.

Local ports, so examples match the Keycloak clients in [`keycloak/realms/p2examples.json`](./keycloak/realms/p2examples.json):

| Port        | Examples                                                                   |
| ----------- | -------------------------------------------------------------------------- |
| 3000        | React, Vue, Nuxt, Next.js, React Router (Remix), SvelteKit                 |
| 4200 / 4201 | Angular, Spring Boot's Angular client, multitenant zoo / aquarium          |
| 8000        | Django                                                                     |
| 8080        | the local Keycloak, or the Spring Boot API (with its own Keycloak on 8888) |
| 8081        | SAML service provider                                                      |

## Authentication

- Use the authorization code flow with PKCE. Never ship a client secret in browser code.
- Log out through Keycloak so the SSO session ends, not only the local session.
- Keep tokens out of the browser in server-side examples; show decoded claims instead.
- Let the library refresh tokens; no `setInterval` refresh loops.

## Look and feel

All examples share the same page, so they are easy to compare and one smoke test covers them all:

- the Phase Two background (`home-bg.webp`, `home-bg-mobile.webp`) and logo, and the `p2blue`, `p2gray`, `p2grad` and `p2dark` colours;
- a header linking to phasetwo.io and to the example's own folder on GitHub;
- the status line "Your current status is:" followed by "Not authenticated." or "Authenticated", with "Log in" and "Log out" buttons;
- decoded "Access token (decoded)" and "ID token (decoded)" panels;
- the Docs, Github, Blog and Contact footer.

Icons are small inline SVG components in each example, so they inherit the text colour. No icon library.

## Before opening a pull request

- `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm lint`, `pnpm test` and `pnpm build` pass on Node.js 24 (or `./gradlew build`, or `python manage.py test`).
- Logging in and out works against the local Keycloak. For the JavaScript examples, run [`tools/e2e-smoke`](./tools/e2e-smoke).
- No secrets are committed.
- The pull request description has a **Docs drift** section listing the phasetwo.io tutorials and docs pages whose code snippets no longer match the example.

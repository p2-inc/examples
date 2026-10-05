# phasetwo-orgs-api

A TypeScript client for the Phase Two Organizations API, generated with [OpenAPI Generator](https://openapi-generator.tech) (`typescript-fetch`) from the [Phase Two OpenAPI spec](https://raw.githubusercontent.com/p2-inc/phasetwo-docs/refs/heads/main/openapi.yaml). The apps only call [`GET /{realm}/orgs/me`](https://phasetwo.io/api/get-me/), through [`api-manager`](../api-manager).

Everything in `src/lib` is generated. Don't edit it by hand: it is excluded from ESLint and Prettier, and the next regeneration overwrites it.

## Regenerate

From the workspace root, with Java 11 or newer on your `PATH`:

```sh
pnpm run generate:orgs-api
```

The generator version and options live in [`openapitools.json`](../../openapitools.json):

| Option                                                                 | Why                                                                                                                                                       |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `globalProperty.apiDocs`, `globalProperty.modelDocs`: `false`          | No Markdown docs next to the code.                                                                                                                        |
| `openapiNormalizer.KEEP_ONLY_FIRST_TAG_IN_OPERATION`: `true`           | Some operations have two tags in the spec. Without this they are generated into two API classes, and `apis/index.ts` exports the same request type twice. |
| `globalProperty.skipFormModel`: `false` and `inlineSchemaNameMappings` | Generates the models of the two form request bodies, which the APIs import, under names that don't clash with the generated `*Request` types.             |

The generator doesn't delete files that are no longer part of the spec. If an API or model disappears upstream, delete `src/lib` (except `.openapi-generator-ignore`) before regenerating.

The generated code doesn't pass `noUnusedLocals`, `noImplicitOverride` or `erasableSyntaxOnly`. The apps import it from source through the `@multitenant/phasetwo-orgs-api` path alias, so it is part of every project's type check, and the workspace [`tsconfig.base.json`](../../tsconfig.base.json) leaves those options off.

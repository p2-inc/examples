# api-manager

`createOrgsApi({ issuerUri, getAccessToken })` wraps the generated [Organizations API client](../phasetwo-orgs-api) for the apps:

- it derives the Organizations API base URL (`{origin}{relative path}/realms`) and the realm name from the OIDC issuer URI, with `createKeycloakUtils` from `oidc-spa/keycloak`;
- it calls `getAccessToken` before every request, so the apps always send the current access token, which oidc-spa renews in the background.

It returns `getMyOrganizations()`, which calls `GET /{realm}/orgs/me` and resolves to the user's organizations, keyed by organization ID, each with its `name`, `displayName` and `roles`.

```ts
import { createOrgsApi } from '@multitenant/api-manager';
import { getOidc } from './oidc';

export const orgsApi = createOrgsApi({
  issuerUri: import.meta.env.VITE_OIDC_ISSUER_URI,
  getAccessToken: async () => (await getOidc({ assert: 'user logged in' })).getAccessToken(),
});
```

Run its tests with `pnpm nx test api-manager`.

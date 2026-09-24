import { oidcSpa } from 'oidc-spa/react-spa';
import { z } from 'zod';

export const { bootstrapOidc, useOidc, getOidc, OidcInitializationGate } =
  oidcSpa
    .withExpectedDecodedIdTokenShape({
      decodedIdTokenSchema: z.looseObject({
        sub: z.string(),
        name: z.string().optional(),
        email: z.string().optional(),
        preferred_username: z.string().optional(),
      }),
      decodedIdToken_mock: {
        sub: 'mock-user',
        name: 'Mock User',
        email: 'mock.user@example.com',
        preferred_username: 'mock-user',
      },
    })
    .createUtils();

bootstrapOidc(
  import.meta.env.VITE_OIDC_USE_MOCK === 'true'
    ? { implementation: 'mock', isUserInitiallyLoggedIn: false }
    : {
        implementation: 'real',
        issuerUri: import.meta.env.VITE_OIDC_ISSUER_URI,
        clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
        scopes: ['profile', 'email'],
        debugLogs: import.meta.env.VITE_OIDC_SPA_DEBUG === 'true',
      },
);

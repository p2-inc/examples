import { createOrgsApi } from '@multitenant/api-manager';
import { getOidc } from './oidc';

export const orgsApi = createOrgsApi({
  issuerUri: import.meta.env.VITE_OIDC_ISSUER_URI,
  getAccessToken: async () =>
    (await getOidc({ assert: 'user logged in' })).getAccessToken(),
});

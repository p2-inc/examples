import type { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

export const authConfig: AuthConfig = {
  issuer: environment.oidcIssuerUri,
  clientId: environment.oidcClientId,
  redirectUri: `${window.location.origin}/`,
  postLogoutRedirectUri: `${window.location.origin}/`,
  responseType: 'code',
  scope: 'openid profile email',
};

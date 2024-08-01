import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://app.phasetwo.io/auth/realms/p2examples',
  redirectUri: window.location.origin + '/index.html',
  clientId: 'angular',
  responseType: 'code',
  scope: 'openid profile email offline_access',
  showDebugInformation: true,
};

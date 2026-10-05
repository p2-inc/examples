import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateFn = (_route, state) => {
  const oauth = inject(OAuthService);
  if (oauth.hasValidAccessToken()) {
    return true;
  }
  oauth.initCodeFlow(state.url);
  return false;
};

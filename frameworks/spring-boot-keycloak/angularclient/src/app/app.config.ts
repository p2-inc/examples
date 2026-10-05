import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { OAuthService, provideOAuthClient } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { authConfig } from './auth/auth.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient({
      resourceServer: {
        allowedUrls: [environment.apiBaseUrl],
        sendAccessToken: true,
      },
    }),
    provideAppInitializer(async () => {
      const oauth = inject(OAuthService);
      const router = inject(Router);
      oauth.configure(authConfig);
      oauth.setupAutomaticSilentRefresh();
      try {
        await oauth.loadDiscoveryDocumentAndTryLogin();
      } catch (error) {
        console.error('Could not reach Keycloak or finish the login', error);
        return;
      }
      if (oauth.state) {
        void router.navigateByUrl(decodeURIComponent(oauth.state));
      }
    }),
  ],
};

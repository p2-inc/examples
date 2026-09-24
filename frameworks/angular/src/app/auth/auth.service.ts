import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OAuthService } from 'angular-oauth2-oidc';
import { jwtDecode } from 'jwt-decode';
import { authConfig } from './auth.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly oauthService = inject(OAuthService);
  private readonly lastEvent = toSignal(this.oauthService.events, { initialValue: null });

  readonly error = signal<string | null>(null);

  readonly isAuthenticated = computed(() => {
    this.lastEvent();
    return this.oauthService.hasValidAccessToken();
  });

  readonly idTokenClaims = computed(() => {
    this.lastEvent();
    return this.oauthService.getIdentityClaims() as Record<string, unknown> | null;
  });

  readonly accessTokenClaims = computed(() => {
    this.lastEvent();
    const accessToken = this.oauthService.getAccessToken();
    return accessToken ? jwtDecode<Record<string, unknown>>(accessToken) : null;
  });

  async init(): Promise<void> {
    this.oauthService.configure(authConfig);
    this.oauthService.setupAutomaticSilentRefresh();
    try {
      await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'Could not reach Keycloak');
    }
  }

  login(): void {
    this.oauthService.initCodeFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }
}

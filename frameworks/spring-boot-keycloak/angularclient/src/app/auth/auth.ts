import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { map, startWith } from 'rxjs';

export interface IdTokenClaims extends JwtPayload {
  name?: string;
  email?: string;
}

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly oauth = inject(OAuthService);

  private readonly session = toSignal(
    this.oauth.events.pipe(
      startWith(null),
      map(() => ({
        keycloakReachable: this.oauth.discoveryDocumentLoaded,
        authenticated: this.oauth.hasValidAccessToken(),
        accessToken: this.oauth.getAccessToken(),
        idToken: this.oauth.getIdToken(),
      })),
    ),
    { requireSync: true },
  );

  readonly keycloakReachable = computed(() => this.session().keycloakReachable);
  readonly authenticated = computed(() => this.session().authenticated);
  readonly accessTokenClaims = computed(() => decode<JwtPayload>(this.session().accessToken));
  readonly idTokenClaims = computed(() => decode<IdTokenClaims>(this.session().idToken));

  login(): void {
    this.oauth.initCodeFlow();
  }

  logout(): void {
    this.oauth.logOut();
  }
}

function decode<T>(token: string | null): T | null {
  return token ? jwtDecode<T>(token) : null;
}

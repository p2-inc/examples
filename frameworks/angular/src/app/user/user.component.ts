import { jwtDecode } from 'jwt-decode';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../auth.config';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgIf],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  isLoggedIn: boolean = false;
  userInfo: any;

  buttonClasses =
    'rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';

  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);

    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => this.oauthService.loadUserProfile());
  }

  signIn() {
    return this.oauthService.initLoginFlow();
  }

  signOut() {
    this.oauthService.logOut();
  }

  private decodeAndStringifyToken(token: any) {
    return JSON.stringify(jwtDecode(token), null, 2);
  }

  get email(): string {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return '';
    return claims['email'];
  }

  get userName(): string {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) return '';
    return claims['given_name'];
  }

  get idToken(): string {
    const token = this.oauthService.getIdToken();
    if (token) {
      return this.decodeAndStringifyToken(token);
    }
    return '';
  }

  get refreshToken(): string {
    const token = this.oauthService.getRefreshToken();
    if (token) {
      return this.decodeAndStringifyToken(token);
    }
    return '';
  }

  get accessToken(): string {
    const token = this.oauthService.getAccessToken();
    if (token) {
      return this.decodeAndStringifyToken(token);
    }
    return '';
  }
}

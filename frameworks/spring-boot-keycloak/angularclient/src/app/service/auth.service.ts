// auth.service.ts
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oauthService: OAuthService) {}

  signIn() {
    return this.oauthService.initLoginFlow();
  }

  signOut() {
    this.oauthService.logOut();
  }

  getDecodedAccessToken(): any {
    const token = this.oauthService.getAccessToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getUserInfo(): any {
    const decodedToken = this.getDecodedAccessToken();
    if (decodedToken) {
      console.log(
        '🚀 ~ AuthService ~ getUserInfo ~ decodedToken:',
        decodedToken
      );
      return {
        username: decodedToken.preferred_username,
        email: decodedToken.email,
        roles: decodedToken.realm_access.roles.join(', '),
        // Add other fields as necessary
      };
    }
    return null;
  }
}

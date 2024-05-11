import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable, of} from "rxjs";
import {OAuthService} from "angular-oauth2-oidc";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private oauthService: OAuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>{
    if(!this.oauthService.hasValidAccessToken()) {
      this.oauthService.initLoginFlow();
    }
    return of(true);
  }
}

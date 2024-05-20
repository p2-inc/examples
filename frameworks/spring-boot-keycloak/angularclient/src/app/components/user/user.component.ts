import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  isLoggedIn: boolean = false;
  private authSubscription: Subscription;
  userInfo: any;

  buttonClasses =
    'rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';

  constructor(
    private oauthService: OAuthService,
    private authService: AuthService
  ) {}

  signIn() {
    return this.authService.signIn();
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    this.isLoggedIn = this.oauthService.hasValidAccessToken();

    this.authSubscription = this.oauthService.events.subscribe((event) => {
      if (event.type === 'token_received' || event.type === 'token_expires') {
        this.isLoggedIn = this.oauthService.hasValidAccessToken();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

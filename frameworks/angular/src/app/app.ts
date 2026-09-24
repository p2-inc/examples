import { Component } from '@angular/core';
import { AppFooter } from './app-footer/app-footer';
import { AppHeader } from './app-header/app-header';
import { UserStatus } from './user-status/user-status';

@Component({
  selector: 'app-root',
  imports: [AppHeader, AppFooter, UserStatus],
  templateUrl: './app.html',
})
export class App {}

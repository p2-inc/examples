import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { Home } from './home/home';
import { Protected } from './protected/protected';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'protected', component: Protected, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];

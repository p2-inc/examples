import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './commons/auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard], // Full route protection
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

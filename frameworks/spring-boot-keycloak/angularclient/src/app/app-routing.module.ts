import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./commons/auth.guard";
import {MainpageComponent} from "./components/mainpage/mainpage.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainpageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

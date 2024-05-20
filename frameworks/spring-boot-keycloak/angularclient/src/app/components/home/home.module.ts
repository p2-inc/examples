import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, UserModule],
  exports: [HomeComponent],
})
export class HomeModule {}

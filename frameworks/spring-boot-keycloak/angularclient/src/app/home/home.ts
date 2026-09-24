import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../environments/environment';
import { Api, ApiResponse } from '../api/api';
import { Auth } from '../auth/auth';

@Component({
  selector: 'app-home',
  imports: [JsonPipe, RouterLink],
  templateUrl: './home.html',
})
export class Home {
  protected readonly auth = inject(Auth);
  private readonly api = inject(Api);

  protected readonly issuer = environment.issuer;
  protected readonly response = signal<ApiResponse | null>(null);

  protected call(path: string): void {
    this.api.get(path).subscribe((response) => this.response.set(response));
  }
}

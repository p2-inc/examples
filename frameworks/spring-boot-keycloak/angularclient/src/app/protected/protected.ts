import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Api } from '../api/api';

@Component({
  selector: 'app-protected',
  imports: [RouterLink],
  template: `
    <h2 class="mb-2 text-2xl text-p2blue-700">Protected page</h2>
    <p class="mb-6 text-p2blue-700">
      Only logged-in users get here: <code>authGuard</code> sends everyone else to Keycloak first.
    </p>
    <div class="text-left">
      <label for="user-response" class="mb-1 block text-sm font-semibold text-gray-900">
        Response from GET /api/test/user
      </label>
      <textarea
        id="user-response"
        rows="6"
        readonly
        class="block w-full rounded-md bg-purple-200/50 px-2 py-1.5 font-mono text-xs text-gray-900 ring-1 ring-gray-300 ring-inset"
        [value]="response()?.text ?? 'Loading…'"
      ></textarea>
    </div>
    <a routerLink="/" class="mt-8 inline-block text-sm font-semibold text-p2blue-700 underline">
      Back to the home page
    </a>
  `,
})
export class Protected {
  protected readonly response = toSignal(inject(Api).get('/api/test/user'));
}

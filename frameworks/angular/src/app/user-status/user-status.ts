import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.html',
})
export class UserStatus {
  protected readonly auth = inject(AuthService);

  protected readonly accessTokenJson = computed(() =>
    JSON.stringify(this.auth.accessTokenClaims() ?? {}, null, 2),
  );

  protected readonly idTokenJson = computed(() =>
    JSON.stringify(this.auth.idTokenClaims() ?? {}, null, 2),
  );

  protected readonly buttonClasses =
    'cursor-pointer rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';

  protected readonly textareaClasses =
    'block w-full rounded-md bg-purple-200/50 px-2 py-1.5 font-mono text-xs text-gray-900 ring-1 ring-gray-300 ring-inset';
}

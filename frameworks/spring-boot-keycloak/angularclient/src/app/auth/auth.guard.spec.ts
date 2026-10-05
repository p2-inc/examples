import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authGuard } from './auth.guard';

function runGuard(hasValidAccessToken: boolean) {
  const oauth = { hasValidAccessToken: () => hasValidAccessToken, initCodeFlow: vi.fn() };
  TestBed.configureTestingModule({ providers: [{ provide: OAuthService, useValue: oauth }] });
  const result = TestBed.runInInjectionContext(() =>
    authGuard({} as ActivatedRouteSnapshot, { url: '/protected' } as RouterStateSnapshot),
  );
  return { result, oauth };
}

describe('authGuard', () => {
  it('lets users with a valid access token through', () => {
    const { result, oauth } = runGuard(true);

    expect(result).toBe(true);
    expect(oauth.initCodeFlow).not.toHaveBeenCalled();
  });

  it('starts the login and keeps the requested page in the state', () => {
    const { result, oauth } = runGuard(false);

    expect(result).toBe(false);
    expect(oauth.initCodeFlow).toHaveBeenCalledWith('/protected');
  });
});

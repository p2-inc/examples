import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth/auth.service';
import { UserStatus } from './user-status';

function createAuthService(authenticated: boolean) {
  return {
    isAuthenticated: signal(authenticated),
    error: signal<string | null>(null),
    idTokenClaims: signal(authenticated ? { name: 'Demo User', email: 'demo@example.com' } : null),
    accessTokenClaims: signal(authenticated ? { sub: 'demo-user' } : null),
    login: vi.fn(),
    logout: vi.fn(),
  };
}

async function render(authenticated: boolean) {
  const auth = createAuthService(authenticated);
  await TestBed.configureTestingModule({
    imports: [UserStatus],
    providers: [{ provide: AuthService, useValue: auth }],
  }).compileComponents();
  const fixture = TestBed.createComponent(UserStatus);
  await fixture.whenStable();
  return { auth, element: fixture.nativeElement as HTMLElement };
}

describe('UserStatus', () => {
  it('offers to log in when not authenticated', async () => {
    const { auth, element } = await render(false);
    expect(element.textContent).toContain('Not authenticated.');
    element.querySelector('button')?.click();
    expect(auth.login).toHaveBeenCalled();
  });

  it('shows the user and the decoded tokens when authenticated', async () => {
    const { auth, element } = await render(true);
    expect(element.textContent).toContain('Authenticated');
    expect(element.textContent).toContain('demo@example.com');
    expect(element.querySelector<HTMLTextAreaElement>('#access-token')?.value).toContain(
      'demo-user',
    );
    element.querySelector('button')?.click();
    expect(auth.logout).toHaveBeenCalled();
  });
});

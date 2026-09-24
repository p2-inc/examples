import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { AuthService } from './auth/auth.service';

describe('App', () => {
  it('renders the Phase Two layout', async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: signal(false),
            error: signal(null),
            idTokenClaims: signal(null),
            accessTokenClaims: signal(null),
            login: vi.fn(),
            logout: vi.fn(),
          },
        },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Angular · angular-oauth2-oidc');
    expect(element.textContent).toContain('Your current status is:');
    expect(element.querySelectorAll('footer a')).toHaveLength(4);
  });
});

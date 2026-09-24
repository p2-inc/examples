import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';
import { Home } from './home';

function fakeJwt(claims: object): string {
  const encode = (part: object) =>
    btoa(JSON.stringify(part)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  return `${encode({ alg: 'RS256', typ: 'JWT' })}.${encode(claims)}.signature`;
}

async function render(loggedIn: boolean) {
  const issuer = 'http://localhost:8888/auth/realms/demo-realm';
  const oauth = {
    events: new Subject<unknown>(),
    discoveryDocumentLoaded: true,
    hasValidAccessToken: () => loggedIn,
    getAccessToken: () =>
      loggedIn ? fakeJwt({ iss: issuer, realm_access: { roles: ['user'] } }) : null,
    getIdToken: () =>
      loggedIn ? fakeJwt({ iss: issuer, name: 'Test User', email: 'test@example.com' }) : null,
    initCodeFlow: vi.fn(),
    logOut: vi.fn(),
  };
  TestBed.configureTestingModule({
    imports: [Home],
    providers: [
      provideRouter([]),
      provideHttpClient(),
      provideHttpClientTesting(),
      { provide: OAuthService, useValue: oauth },
    ],
  });
  const fixture = TestBed.createComponent(Home);
  await fixture.whenStable();
  const element = fixture.nativeElement as HTMLElement;
  const button = (name: string) =>
    Array.from(element.querySelectorAll('button')).find(
      (candidate) => candidate.textContent?.trim() === name,
    ) as HTMLButtonElement;
  const textarea = (id: string) => element.querySelector<HTMLTextAreaElement>(`#${id}`);
  return { fixture, element, oauth, button, textarea, http: TestBed.inject(HttpTestingController) };
}

describe('Home', () => {
  it('starts the login when logged out', async () => {
    const { element, oauth, button, textarea } = await render(false);

    expect(element.textContent).toContain('Not authenticated.');
    expect(textarea('access-token')).toBeNull();

    button('Log in').click();
    expect(oauth.initCodeFlow).toHaveBeenCalled();
  });

  it('shows the user and the decoded tokens when logged in', async () => {
    const { element, oauth, button, textarea } = await render(true);

    expect(element.textContent).toContain('Authenticated');
    expect(element.textContent).toContain('Test User');
    expect(element.textContent).toContain('test@example.com');
    expect(textarea('access-token')?.value).toContain('"iss"');
    expect(textarea('id-token')?.value).toContain('"email": "test@example.com"');

    button('Log out').click();
    expect(oauth.logOut).toHaveBeenCalled();
  });

  it('shows the JSON returned by the API', async () => {
    const { fixture, button, textarea, http } = await render(true);

    button('Call /api/test/user').click();
    http
      .expectOne('http://localhost:8080/api/test/user')
      .flush({ message: 'Hello Secured with user role.', user: 'test' });
    await fixture.whenStable();

    expect(textarea('api-response')?.value).toContain('"user": "test"');
  });

  it('shows the HTTP status when the API refuses the call', async () => {
    const { fixture, button, textarea, http } = await render(true);

    button('Call /api/test/user').click();
    http
      .expectOne('http://localhost:8080/api/test/user')
      .flush(null, { status: 403, statusText: 'Forbidden' });
    await fixture.whenStable();

    expect(textarea('api-response')?.value).toContain('403 Forbidden');
  });
});

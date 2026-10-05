import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    });
  });

  it('links to the example on GitHub', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(
      element.querySelector('a[aria-label="Source code on GitHub"]')?.getAttribute('href'),
    ).toBe('https://github.com/p2-inc/examples/tree/main/frameworks/spring-boot-keycloak');
    expect(element.textContent).toContain('Spring Boot · Angular');
  });

  it('renders the footer links', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll('footer a');

    expect(Array.from(links, (link) => link.textContent?.trim())).toEqual([
      'Docs',
      'Github',
      'Blog',
      'Contact',
    ]);
  });
});

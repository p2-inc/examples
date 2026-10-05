import { afterEach, describe, expect, it, vi } from 'vitest';
import { createOrgsApi } from './api-manager';

function stubFetch() {
  const fetchMock = vi.fn<typeof fetch>(async () =>
    Response.json({ 'org-id': { name: 'california', roles: ['zoo'] } }),
  );
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

describe('createOrgsApi', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls orgs/me of the realm with a fresh access token each time', async () => {
    const fetchMock = stubFetch();
    const tokens = ['first-token', 'second-token'];
    const orgsApi = createOrgsApi({
      issuerUri: 'http://localhost:8080/auth/realms/p2examples',
      getAccessToken: async () => tokens.shift() ?? '',
    });

    await expect(orgsApi.getMyOrganizations()).resolves.toMatchObject({
      'org-id': { name: 'california', roles: ['zoo'] },
    });
    await orgsApi.getMyOrganizations();

    const [[url, firstInit], [, secondInit]] = fetchMock.mock.calls;
    expect(url).toBe('http://localhost:8080/auth/realms/p2examples/orgs/me');
    expect(new Headers(firstInit?.headers).get('Authorization')).toBe(
      'Bearer first-token',
    );
    expect(new Headers(secondInit?.headers).get('Authorization')).toBe(
      'Bearer second-token',
    );
  });

  it('supports Keycloak without the /auth relative path', async () => {
    const fetchMock = stubFetch();
    const orgsApi = createOrgsApi({
      issuerUri: 'https://keycloak.example.com/realms/acme',
      getAccessToken: async () => 'token',
    });

    await orgsApi.getMyOrganizations();

    expect(fetchMock.mock.calls[0]?.[0]).toBe(
      'https://keycloak.example.com/realms/acme/orgs/me',
    );
  });
});

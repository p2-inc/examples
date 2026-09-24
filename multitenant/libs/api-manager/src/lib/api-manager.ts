import {
  Configuration,
  OrganizationsApi,
  type MyOrganizationRepresentation,
} from '@multitenant/phasetwo-orgs-api';
import { createKeycloakUtils } from 'oidc-spa/keycloak';

export type MyOrganizations = Record<string, MyOrganizationRepresentation>;

export type OrgsApi = {
  getMyOrganizations: () => Promise<MyOrganizations>;
};

export function createOrgsApi({
  issuerUri,
  getAccessToken,
}: {
  issuerUri: string;
  getAccessToken: () => Promise<string>;
}): OrgsApi {
  const { origin, realm, kcHttpRelativePath } = createKeycloakUtils({
    issuerUri,
  }).issuerUriParsed;

  const organizationsApi = new OrganizationsApi(
    new Configuration({
      basePath: `${origin}${kcHttpRelativePath ?? ''}/realms`,
      accessToken: () => getAccessToken(),
    }),
  );

  return {
    getMyOrganizations: () => organizationsApi.getMe({ realm }),
  };
}

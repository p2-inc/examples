import {
  OrganizationsApi,
  Configuration,
} from '@multitenant/phasetwo-orgs-api';
import { Oidc } from 'oidc-spa';

const BASE_PATH = 'https://app.phasetwo.io/auth';
export const REALM = '<REALM>';

export class ApiManager {
  private isInitialized = false;
  // P2 Orgs APIs
  private p2OrganizationsApiConfig: Configuration | null = null;
  private p2OrganizationsApi: OrganizationsApi | null = null;

  public async initialize({ oidc }: { oidc: Oidc<Record<string, unknown>> }) {
    if (!this.isInitialized) {
      try {
        await this.initializeConfigAndApis({ oidc });
        this.isInitialized = true;
      } catch (error) {
        console.error('Error initializing API manager:', error);
      }
    }
  }

  private async initializeConfigAndApis({
    oidc,
  }: {
    oidc: Oidc<Record<string, unknown>>;
  }) {
    if (!oidc.isUserLoggedIn) {
      throw new Error('User is not logged in.');
    }

    const accessToken = await oidc.getTokens().accessToken;

    // P2 Orgs APIs
    this.p2OrganizationsApiConfig = new Configuration({
      basePath: `${BASE_PATH}/realms`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    this.p2OrganizationsApi = new OrganizationsApi(
      this.p2OrganizationsApiConfig
    );
  }

  // P2 Orgs API Methods
  public async fetchP2OrganizationsOrgsGetMe() {
    if (!this.p2OrganizationsApi) {
      throw new Error('OrganizationsApi is not initialized.');
    }

    return this.p2OrganizationsApi.getMe({
      realm: REALM,
    });
  }
}

export default ApiManager;

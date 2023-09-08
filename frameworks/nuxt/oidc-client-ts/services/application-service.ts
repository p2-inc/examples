import { keycloakConfig } from "./keycloak-config";

export default class ApplicationService {
  constructor(private readonly accessToken: string) {}

  getDefaultHeader() {
    return { Authorization: `Bearer ${this.accessToken}` };
  }

  // use this to add to API calls or the like
}

import { keycloakConfig } from "./keycloak-config";
import { User, UserManager, WebStorageStateStore } from "oidc-client-ts";

export default class AuthService {
  private userManager!: UserManager;
  private keycloakConfig: any;

  constructor() {
    const rtConfig = useRuntimeConfig();

    this.keycloakConfig = {
      ...rtConfig.public,
    };
    this.initializedOidc();
  }

  private initializedOidc() {
    try {
      const { realm, keycloakIssuer, clientId } = this.keycloakConfig;
      const settings = {
        authority: `${keycloakIssuer}/auth/realms/${realm}`,
        client_id: clientId,
        redirect_uri: `${window.location.origin}/auth`,
        silent_redirect_uri: `${window.location.origin}/silent-refresh`,
        post_logout_redirect_uri: `${window.location.origin}`,
        response_type: "code",
        userStore: new WebStorageStateStore(),
        loadUserInfo: true,
      };
      this.userManager = new UserManager(settings);
    } catch (error) {
      console.error(error);
    }
  }

  public signInRedirect() {
    return this.userManager.signinRedirect();
  }

  public signInCallback() {
    return this.userManager.signinCallback();
  }

  public renewToken(): Promise<void> {
    return this.userManager.signinSilentCallback();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }

  public getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }
}

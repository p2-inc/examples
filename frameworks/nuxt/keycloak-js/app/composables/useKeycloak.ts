import type { KeycloakTokenParsed } from "keycloak-js";

type KeycloakState = {
  authenticated: boolean;
  tokenParsed?: KeycloakTokenParsed;
  idTokenParsed?: KeycloakTokenParsed;
  error?: string;
};

export const useKeycloakState = () =>
  useState<KeycloakState>("keycloak", () => ({ authenticated: false }));

export function useKeycloak() {
  const { $keycloak } = useNuxtApp();

  return {
    state: useKeycloakState(),
    login: () => $keycloak.login(),
    logout: () =>
      $keycloak.logout({ redirectUri: `${window.location.origin}/` }),
  };
}

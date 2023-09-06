import Keycloak from "keycloak-js";

export const useKeycloak = () => {
  const nuxtApp = useNuxtApp();
  const keycloak = nuxtApp.$keycloak as Keycloak;
  const authState = useState("authState", () => "unAuthenticated");

  keycloak.onAuthSuccess = () => (authState.value = "authenticated");
  keycloak.onAuthError = () => (authState.value = "error");

  return {
    keycloak,
    authState,
  };
};

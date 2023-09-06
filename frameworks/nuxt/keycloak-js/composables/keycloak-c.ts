import Keycloak from "keycloak-js";

export const useKeycloak = () => {
  const nuxtApp = useNuxtApp();

  const $keycloak = nuxtApp.$keycloak as Keycloak;

  return $keycloak;
};

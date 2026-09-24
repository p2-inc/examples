import { UserManager } from "oidc-client-ts";

export default defineNuxtPlugin(() => {
  const { oidcIssuerUri, oidcClientId } = useRuntimeConfig().public;

  const userManager = new UserManager({
    authority: oidcIssuerUri,
    client_id: oidcClientId,
    redirect_uri: `${window.location.origin}/auth`,
    silent_redirect_uri: `${window.location.origin}/silent-refresh`,
    post_logout_redirect_uri: `${window.location.origin}/`,
    scope: "openid profile email",
  });

  return { provide: { userManager } };
});

import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

export const kc = {
  authorityUrl: 'https://app.phasetwo.io',
  realm: 'p2examples',
  clientId: 'vue-example'
}

const Auth = new UserManager({
  authority: `${kc.authorityUrl}/auth/realms/${kc.realm}`,
  client_id: kc.clientId,
  redirect_uri: `${window.location.origin}/auth`,
  silent_redirect_uri: `${window.location.origin}/silent-refresh`,
  post_logout_redirect_uri: `${window.location.origin}`,
  response_type: 'code',
  userStore: new WebStorageStateStore(),
  loadUserInfo: true
})

export default Auth

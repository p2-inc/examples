import { UserManager, WebStorageStateStore } from 'oidc-client-ts'

export const kc = {
  authorityUrl: 'https://euc1.auth.ac',
  applicationUrl: 'http://localhost:3000',
  realm: 'shared-deployment-001',
  clientId: 'reg-example-1',
  clientSecret: '6IPrJWTjcn3iWI5KjfILedtrUSjyClGK'
}

const Auth = new UserManager({
  authority: `${kc.authorityUrl}/auth/realms/${kc.realm}`,
  client_id: kc.clientId,
  client_secret: kc.clientSecret,
  redirect_uri: `${window.location.origin}/auth`,
  silent_redirect_uri: `${window.location.origin}/silent-refresh`,
  post_logout_redirect_uri: `${window.location.origin}`,
  response_type: 'code',
  userStore: new WebStorageStateStore(),
  loadUserInfo: true
})

export default Auth

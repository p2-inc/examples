import type { User } from 'oidc-client-ts'
import { shallowRef } from 'vue'
import { userManager } from '@/auth'

const user = shallowRef<User | null>(null)
const error = shallowRef<Error | null>(null)

userManager.events.addUserLoaded((loadedUser) => {
  user.value = loadedUser
  error.value = null
})
userManager.events.addUserUnloaded(() => {
  user.value = null
})
userManager.events.addSilentRenewError((renewError) => {
  error.value = renewError
})

export async function initAuth() {
  const storedUser = await userManager.getUser()
  user.value = storedUser && !storedUser.expired ? storedUser : null
}

export function setAuthError(authError: unknown) {
  error.value = authError instanceof Error ? authError : new Error(String(authError))
}

export function useAuth() {
  return {
    user,
    error,
    signIn: () => userManager.signinRedirect({ state: { returnTo: window.location.pathname } }),
    signOut: () => userManager.signoutRedirect(),
  }
}

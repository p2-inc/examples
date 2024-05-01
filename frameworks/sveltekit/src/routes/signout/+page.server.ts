import { signOut } from "$src/auth.js"
import type { Actions } from "./$types.js"

export const actions = { default: signOut } satisfies Actions

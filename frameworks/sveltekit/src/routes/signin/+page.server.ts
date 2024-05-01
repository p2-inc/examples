import { signIn } from "$src/auth.js"
import type { Actions } from "./$types.js"

export const actions = { default: signIn } satisfies Actions

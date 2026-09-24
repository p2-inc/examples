<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userManager } from '@/auth'
import { setAuthError } from '@/composables/useAuth'

const router = useRouter()

onMounted(async () => {
  try {
    const user = await userManager.signinCallback()
    const state = user?.state as { returnTo?: string } | undefined
    await router.replace(state?.returnTo ?? '/')
  } catch (callbackError) {
    setAuthError(callbackError)
    await router.replace('/')
  }
})
</script>

<template>
  <div>
    <div class="pb-8 text-xl italic">Your current status is:</div>
    <div class="mb-6 text-2xl text-p2blue-700">Loading authentication…</div>
  </div>
</template>

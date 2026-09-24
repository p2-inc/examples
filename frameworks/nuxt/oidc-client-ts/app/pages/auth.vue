<script setup lang="ts">
const auth = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    await router.replace(await auth.handleCallback());
  } catch (callbackError) {
    auth.setError(callbackError);
    await router.replace("/");
  }
});
</script>

<template>
  <div>
    <div class="pb-8 text-xl italic">Your current status is:</div>
    <div class="mb-6 text-2xl text-p2blue-700">Loading authentication…</div>
  </div>
</template>

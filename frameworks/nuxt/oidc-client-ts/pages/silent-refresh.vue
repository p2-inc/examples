<template>
  <div class="mb-6 text-p2blue-700 text-2xl">
    Loading authentication... (checking local state or redirecting)
  </div>
</template>

<script lang="ts" setup>
import { useServices } from "@/composables/useServices";

const services = useServices();
const router = useRouter();

const silentRefreshOidc = async () => {
  try {
    await services.$auth.renewToken();
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};

await silentRefreshOidc();
</script>

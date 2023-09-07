<template>
  <div class="mb-6 text-p2blue-700 text-2xl">Logging out...</div>
</template>

<script lang="ts" setup>
import { useServices } from "@/composables/useServices";
import { useAuth } from "~/stores/auth";

const services = useServices();
const authStore = useAuth();

const logOutOidc = async () => {
  try {
    authStore.clearUserSession();
    await services.$auth.logout();
  } catch (error) {
    console.error(error);
  }
};

await logOutOidc();
</script>

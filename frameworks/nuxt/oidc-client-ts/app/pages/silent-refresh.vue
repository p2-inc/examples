<script setup lang="ts">
definePageMeta({ layout: false });

const auth = useAuthStore();

onMounted(() => auth.handleSilentCallback());
</script>

<template>
  <div></div>
</template>

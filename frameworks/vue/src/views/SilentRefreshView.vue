<script setup lang="ts">
import { onMounted } from 'vue'
import { userManager } from '@/auth'

onMounted(() => userManager.signinSilentCallback())
</script>

<template>
  <div></div>
</template>

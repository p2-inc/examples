<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="page-bg min-h-screen">
    <AppHeader />
    <main class="py-8">
      <div class="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <RouterView />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

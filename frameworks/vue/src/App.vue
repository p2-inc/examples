<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Links from './components/Links.vue'
</script>

<template>
  <div>
    <Header />
    <div class="py-12">
      <div class="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <RouterView />
      </div>
    </div>
    <Links />
  </div>
</template>

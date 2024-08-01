<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/Header.vue'
import LinksComponent from './components/Links.vue'
</script>

<template>
  <div>
    <HeaderComponent />
    <div class="py-12">
      <div class="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <RouterView />
      </div>
    </div>
    <LinksComponent />
  </div>
</template>

<script setup lang="ts">
import IconGithub from "~/components/icons/IconGithub.vue";
import IconNuxt from "~/components/icons/IconNuxt.vue";

const exampleUrl =
  "https://github.com/p2-inc/examples/tree/main/frameworks/nuxt/oidc-client-ts";
</script>

<template>
  <picture>
    <source media="(max-width: 767px)" srcset="/home-bg-mobile.webp" />
    <source media="(min-width: 768px)" srcset="/home-bg.webp" />
    <img class="page-home" src="/home-bg-mobile.webp" alt="" />
  </picture>
  <header class="px-6 pt-24 pb-8 sm:py-8 lg:px-8 lg:pt-24 lg:pb-8">
    <div class="mx-auto max-w-2xl text-center">
      <a href="https://phasetwo.io" target="_blank" rel="noreferrer">
        <img
          src="/logo_phase_slash.svg"
          class="mx-auto max-h-28 w-full max-w-xl"
          alt="Phase Two"
        />
      </a>
      <a
        :href="exampleUrl"
        target="_blank"
        rel="noreferrer"
        aria-label="Source code on GitHub"
        class="mt-6 flex items-center justify-center gap-2 text-5xl text-p2blue-500"
      >
        <IconNuxt />
        <IconGithub />
      </a>
      <p class="mt-4 text-lg text-p2blue-700">Nuxt · oidc-client-ts</p>
    </div>
  </header>
</template>

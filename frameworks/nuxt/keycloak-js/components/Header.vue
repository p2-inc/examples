<template>
  <div>
    <picture>
      <source media="(max-width: 767px)" srcSet="/home-bg-mobile.webp" />
      <source media="(min-width: 768px)" srcSet="/home-bg.webp" />
      <img
        class="page-home"
        src="/home-bg-mobile.webp"
        alt="Gradient Background"
      />
    </picture>
    <div class="px-6 pt-24 pb-8 sm:py-8 lg:pt-24 lg:pb-8 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <a href="https://phasetwo.io" target="_blank" rel="noreferrer">
          <img
            src="/logo_phase_slash.svg"
            class="w-full max-w-xl mx-auto max-h-28"
            alt="Phase Two"
          />
        </a>
        <a
          href="https://github.com/p2-inc/examples/tree/main/frameworks/nuxt/keycloak-js"
          target="_blank"
          rel="noreferrer"
        >
          <p
            class="text-4xl font-semibold leading-7 text-p2blue-500 mt-6 flex items-center w-full justify-center"
          >
            <iconify-icon icon="logos:nuxt-icon" class="mr-2"></iconify-icon>
            <iconify-icon icon="bi:github" class="w-9"></iconify-icon>
          </p>
          [keycloak-js]
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import "iconify-icon";

export default {
  name: "HeaderComponent",
};
</script>

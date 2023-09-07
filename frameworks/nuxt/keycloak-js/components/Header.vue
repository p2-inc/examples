<template>
  <div>
    <picture>
      <source media="(max-width: 767px)" srcSet="/home-bg-mobile.jpg" />
      <source media="(min-width: 768px)" srcSet="/home-bg.jpg" />
      <img
        class="page-home"
        src="/img/home-bg-mobile.jpg"
        alt="Gradient Background"
      />
    </picture>
    <div class="px-6 py-24 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <a href="https://phasetwo.io" target="_blank" rel="noreferrer">
          <img
            src="/logo_phase_slash.svg"
            class="w-full max-w-xl mx-auto"
            alt="Phase Two"
          />
        </a>
        <a
          href="https://github.com/p2-inc/examples/tree/main/frameworks/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          <p class="text-xl font-semibold leading-7 text-p2blue-500 mt-6">
            Nuxt App Example
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

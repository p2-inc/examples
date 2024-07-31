<script lang="ts">
  import Icon from "@iconify/svelte";
  import User from "$components/user.svelte";
  import Footer from "$components/footer.svelte";
  import type { LayoutServerData } from "./$types.js";

  export let data: LayoutServerData;
</script>

<svelte:head>
  <title>SvelteKit + Phase Two Example</title>
</svelte:head>

<div class="page-bg min-h-screen">
  <picture>
    <source media="(max-width: 767px)" srcSet="/home-bg-mobile.webp" />
    <source media="(min-width: 768px)" srcSet="/home-bg.webp" />
    <img
      class="page-home"
      src="/img/home-bg-mobile.webp"
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
        href="https://github.com/p2-inc/examples/tree/main/frameworks/sveltekit"
        target="_blank"
        rel="noreferrer"
      >
        <p
          class="text-5xl font-semibold leading-7 text-p2blue-500 mt-6 flex items-center w-full justify-center"
        >
          <Icon icon="logos:svelte" class="mr-6" />
          <Icon icon="bi:github" />
        </p>
      </a>
    </div>
  </div>
  <div class="py-12">
    <div class="mx-auto max-w-3xl px-6 lg:px-8 text-center">
      <User
        data={{
          user: data?.session?.user,
          status: Boolean(data?.session),
        }}
      />
    </div>
  </div>
  <Footer />
</div>

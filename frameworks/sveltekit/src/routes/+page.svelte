<script lang="ts">
  import User from "$components/user.svelte";
  import type { LayoutServerData } from "./$types.js";

  export let data: LayoutServerData;
</script>

<div class="page-bg min-h-screen">
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
          SvelteKit App Example
        </p>
      </a>
    </div>
  </div>
  <div class="py-12">
    <div class="mx-auto max-w-3xl px-6 lg:px-8 text-center">
      <User
        data={{
          status: Boolean(data),
          user: data.session.user,
        }}
      />
    </div>
  </div>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-3xl px-6 lg:px-8">
      <div
        class="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl"
      >
        <a
          href="https://phasetwo.io/docs/introduction"
          target="_blank"
          rel="noreferrer"
        >
          <div
            class="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80"
          >
            Docs
          </div>
        </a>
        <a href="https://github.com/p2-inc/" target="_blank" rel="noreferrer">
          <div
            class="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80"
          >
            Github
          </div>
        </a>
        <a href="https://phasetwo.io/blog" target="_blank" rel="noreferrer">
          <div
            class="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80"
          >
            Blog
          </div>
        </a>
        <a href="mailto:support@phasetwo.io" target="_blank" rel="noreferrer">
          <div
            class="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80"
          >
            Contact
          </div>
        </a>
      </div>
    </div>
  </div>
</div>

<script>
  import Icon from "@iconify/svelte";
</script>

<div class="sm:py-20">
  <div class="mx-auto max-w-3xl px-6 lg:px-8">
    <div
      class="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl"
    >
      <a
        href="https://phasetwo.io/docs/introduction"
        target="_blank"
        rel="noreferrer"
      >
        <div class="link-container">
          Docs
          <Icon icon="line-md:external-link-rounded" class="ml-1" />
        </div>
      </a>
      <a href="https://github.com/p2-inc/" target="_blank" rel="noreferrer">
        <div class="link-container">
          Github
          <Icon icon="bi:github" class="ml-1" />
        </div>
      </a>
      <a href="https://phasetwo.io/blog" target="_blank" rel="noreferrer">
        <div class="link-container">
          Blog
          <Icon icon="line-md:external-link-rounded" class="ml-1" />
        </div>
      </a>
      <a href="mailto:support@phasetwo.io" target="_blank" rel="noreferrer">
        <div class="link-container">
          Contact
          <Icon
            icon="ic:outline-email"
            class="ml-1"
            style="width: 1.1em; height: 1.1em;"
          />
        </div>
      </a>
    </div>
  </div>
</div>

<style>
  .link-container {
    @apply p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80 flex items-center justify-center;
  }
</style>

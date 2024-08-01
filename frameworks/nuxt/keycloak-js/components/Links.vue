<template>
  <div className="sm:py-20">
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
            class="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80 flex items-center justify-center"
          >
            <iconify-icon
              icon="line-md:external-link-rounded"
              class="w-5 mr-1"
            ></iconify-icon>
            Docs
          </div>
        </a>
        <a href="https://github.com/p2-inc/" target="_blank" rel="noreferrer">
          <div
            class="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80 flex items-center justify-center"
          >
            <iconify-icon icon="bi:github" class="w-5 mr-1"></iconify-icon>
            Github
          </div>
        </a>
        <a href="https://phasetwo.io/blog" target="_blank" rel="noreferrer">
          <div
            class="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80 flex items-center justify-center"
          >
            <iconify-icon
              icon="line-md:external-link-rounded"
              class="w-5 mr-1"
            ></iconify-icon>
            Blog
          </div>
        </a>
        <a href="mailto:support@phasetwo.io" target="_blank" rel="noreferrer">
          <div
            class="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80 flex items-center justify-center"
          >
            <iconify-icon
              icon="ic:outline-email"
              class="w-5 mr-1"
            ></iconify-icon>
            Contact
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import "iconify-icon";

export default {
  name: "LinksComponent",
};
</script>

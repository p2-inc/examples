<template>
  <div class="page-bg min-h-screen">
    <AppHeader />
    <main class="py-8">
      <div class="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <slot />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

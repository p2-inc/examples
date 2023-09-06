<script setup lang="ts">
import { nextTick, ref } from "vue";
const renderComponent = ref(true);

const { keycloak, authState } = useKeycloak();
function login() {
  keycloak.login();
}

function logout() {
  keycloak.logout();
}

const forceRender = async () => {
  renderComponent.value = false;
  await nextTick();
  renderComponent.value = true;
};
</script>

<template>
  <div class="page-bg">
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
    <div class="py-12">
      <div
        class="mx-auto max-w-3xl px-6 lg:px-8 text-center"
        v-if="renderComponent"
      >
        <div v-if="authState === 'unAuthenticated'">
          <div class="mb-6 text-p2blue-700 text-2xl">Not authenticated.</div>
          <button
            class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="login()"
          >
            Log in
          </button>
        </div>
        <div v-if="authState === 'authenticated'">
          <div class="mb-2 text-p2blue-700 text-2xl">Authenticated</div>
          <div class="mb-6 text-p2blue-700 text-md">
            <div>{{ keycloak.tokenParsed?.email }}</div>
            <div>{{ keycloak.tokenParsed?.sub }}</div>
          </div>
          <button
            class="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            @click="logout()"
          >
            Log out
          </button>
        </div>
        <div>
          <div
            v-if="authState === 'error'"
            class="mb-6 text-p2blue-700 text-2xl"
          >
            Authentication Error.
          </div>
        </div>
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
</template>

<script setup lang="ts">
import { useKeycloak } from "../composables/keycloak-c";
import TokenComponent from "./Token.vue";

const { keycloak, authState } = useKeycloak();

function login() {
  keycloak.login();
}

function logout() {
  keycloak.logout();
}
</script>

<template>
  <div>
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
      <TokenComponent :user="keycloak" />
    </div>
    <div>
      <div v-if="authState === 'error'" class="mb-6 text-p2blue-700 text-2xl">
        Authentication Error.
      </div>
    </div>
  </div>
</template>

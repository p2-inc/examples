<script setup lang="ts">
const { state, login, logout } = useKeycloak();

const buttonClasses =
  "cursor-pointer rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
</script>

<template>
  <div>
    <div class="pb-8 text-xl italic">Your current status is:</div>
    <template v-if="state.authenticated">
      <div class="mb-2 text-2xl text-p2blue-700">Authenticated</div>
      <div class="mb-6 text-p2blue-700">
        <div>{{ state.idTokenParsed?.name }}</div>
        <div>{{ state.idTokenParsed?.email }}</div>
      </div>
      <button type="button" :class="buttonClasses" @click="logout()">
        Log out
      </button>
      <TokenPanels
        :access-token="state.tokenParsed"
        :id-token="state.idTokenParsed"
      />
    </template>
    <template v-else-if="state.error">
      <div class="mb-2 text-2xl text-p2blue-700">Authentication error.</div>
      <div class="mb-6">{{ state.error }}</div>
      <button type="button" :class="buttonClasses" @click="login()">
        Log in
      </button>
    </template>
    <template v-else>
      <div class="mb-6 text-2xl text-p2blue-700">Not authenticated.</div>
      <button type="button" :class="buttonClasses" @click="login()">
        Log in
      </button>
    </template>
  </div>
</template>

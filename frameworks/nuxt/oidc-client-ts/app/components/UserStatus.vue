<script setup lang="ts">
const auth = useAuthStore();
const { user, error } = storeToRefs(auth);

const buttonClasses =
  "cursor-pointer rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
</script>

<template>
  <div>
    <div class="pb-8 text-xl italic">Your current status is:</div>
    <template v-if="user">
      <div class="mb-2 text-2xl text-p2blue-700">Authenticated</div>
      <div class="mb-6 text-p2blue-700">
        <div>{{ user.profile.name }}</div>
        <div>{{ user.profile.email }}</div>
      </div>
      <button type="button" :class="buttonClasses" @click="auth.signOut()">
        Log out
      </button>
      <TokenPanels :user="user" />
    </template>
    <template v-else-if="error">
      <div class="mb-2 text-2xl text-p2blue-700">Authentication error.</div>
      <div class="mb-6">{{ error }}</div>
      <button type="button" :class="buttonClasses" @click="auth.signIn()">
        Log in
      </button>
    </template>
    <template v-else>
      <div class="mb-6 text-2xl text-p2blue-700">Not authenticated.</div>
      <button type="button" :class="buttonClasses" @click="auth.signIn()">
        Log in
      </button>
    </template>
  </div>
</template>

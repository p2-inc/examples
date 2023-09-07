<template>
  <div>
    <div class="text-xl pb-8 italic">Your current status is:</div>
    <!-- Not authenticated -->
    <div v-if="!user">
      <div class="mb-6 text-p2blue-700 text-2xl">Not authenticated.</div>
      <button :class="buttonClasses" @click="signIn()">Sign in</button>
    </div>
    <!-- Authenticated -->
    <div v-if="user">
      <div class="mb-2 text-p2blue-700 text-2xl">Authenticated</div>
      <div class="mb-6 text-p2blue-700 text-md">
        <div>{{ user?.profile?.email }}</div>
        <div>{{ user?.profile?.name }}</div>
      </div>
      <button :class="buttonClasses" @click="signOut()">Sign out</button>
    </div>
    <!-- Error -->
  </div>
</template>

<script lang="ts" setup>
const services = useServices();
const buttonClasses =
  "rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

const user = await services.$auth.getUser();

const signIn = () => services.$auth.signInRedirect();
const signOut = () => services.$auth.logout();
</script>

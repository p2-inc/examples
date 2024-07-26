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
      <button :class="buttonClasses" @click="logout()">Sign out</button>
    </div>

    <TokenComponent v-if="user" :user="user" />
  </div>
</template>

<script>
import TokenComponent from './Token.vue'

export default {
  name: 'UserComponent',
  components: {
    TokenComponent
  },
  data() {
    return {
      user: null,
      buttonClasses:
        'rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
      signIn: () => this.$auth.signinRedirect(),
      logout: () => this.$auth.signoutRedirect()
    }
  },
  async created() {
    const user = await this.$auth.getUser()
    console.log('🚀 ~ created ~ user:', user)
    if (user) {
      this.user = user
    }
  }
}
</script>

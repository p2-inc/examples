<template>
  <div>Authenticating...</div>
</template>

<script>
export default {
  name: 'AuthAuthenticated',
  async mounted() {
    try {
      await this.$auth.signinCallback()
      this.$router.push('/')
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

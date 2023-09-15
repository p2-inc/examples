<template></template>

<script>
export default {
  name: 'SilentRefresh',
  async mounted() {
    await this.$auth.renewToken()
  }
}
</script>

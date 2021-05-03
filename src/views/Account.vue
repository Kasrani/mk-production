<template>
  <div>
    <h1 class="mt-6 ml-6">Page profil</h1>
    <h3 class="mt-6 ml-6">Votre email</h3>
    <p class="mt-2 ml-6">{{ currentUser.email }}</p>
  </div>
</template>

<script>
export default {
  name: 'Account',
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    }
  }
}
</script>

<style>

</style>
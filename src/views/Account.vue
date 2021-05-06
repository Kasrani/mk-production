<template>
  <section id="settings">
    <div class="col1">
      <h3>Settings</h3>
      <p>Update your profile</p>

      <transition name="fade">
        <p v-if="showSuccess" class="success">profile updated</p>
      </transition>

      <form @submit.prevent>
        <input v-model="name" type="text" />
        <input v-model="email" type="text" />
        <button @click="updateProfile()" class="button">Update Profile</button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      name: '',
      email: '',
      showSuccess: false
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('updateProfile', {
        name: this.name !== '' ? this.name : this.userProfile.name,
        email: this.email !== '' ? this.email : this.userProfile.email
      })

      this.name = ''
      this.email = ''

      this.showSuccess = true

      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    }
  }
}
</script>

<style>

</style>
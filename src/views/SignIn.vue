<template>
  <div class="mt-6 ml-6">
  <form @submit.prevent="signIn">
    <h2>Page de connexion</h2>
    <input
      type="email"
      placeholder="Email address..."
      v-model="email"
    />
    <input
      type="password"
      placeholder="password..."
      v-model="password"
    />
    <button type="submit">Connexion</button>
  </form>
  <div v-if="error">
      <div>{{ error }}</div>
  </div>
</div>
</template>
<script>
//import firebase from "firebase";
import database from "../services/database";
export default {

    name: "SignIn",
    data() { 
    return { 
        email: '', 
        password: '', 
        error: ''
    }; 
    },
    methods: {
        async signIn() {
            let result = await database.signIn(this.email, this.password)
            if(result.message) {
                this.error = result.message
            } else {
                console.log('User is signed in');
                this.$router.push('/account');
            }
        }
    },
};
</script>
<style scoped>
</style>
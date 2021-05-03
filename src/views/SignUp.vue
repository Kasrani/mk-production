<template>
  <div class="mt-6 ml-6">
  <form @submit.prevent="signUp">
    <h2>Page d'Inscription</h2>
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
    <button type="submit">Inscription</button>
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

    name: "SignUp",
    data() { 
    return { 
        email: '', 
        password: '', 
        error: ''
    }; 
    },
    methods: {
        async signUp() {
            let result = await database.signUp(this.email, this.password)
            if(result.message) {
                this.error = result.message
            } else {
                console.log('User created !');
            }
        }
    },
};
</script>
<style scoped>
</style>
<template>
  <div class="mt-6 ml-6" style="text-align: center">
    <form @submit.prevent="signIn">
      <h2>Page de connexion</h2>
      <v-col cols="12" md="4" style="margin: auto">
        <v-text-field v-model="email" label="E-mail" required></v-text-field>
      </v-col>
      <v-col cols="12" sm="4" style="margin: auto">
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Mot de passe"
          counter
        ></v-text-field>
      </v-col>
      <v-btn color="#F0BF51" class="mr-4" @click="signIn"> Connexion </v-btn>
    </form>
    <v-col cols="12" sm="4" class="mt-2" style="margin: auto">
      Vous n'avez pas un compte ?
      <router-link to="/sign-up">S'inscrire</router-link>
    </v-col>
    <div v-if="error">
      <div>{{ error }}</div>
    </div>
  </div>
</template>
<script>
//import { db } from "../db";
export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      show1: false,
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch("signIn", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
<style scoped>
</style>
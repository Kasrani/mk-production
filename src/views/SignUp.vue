<template>
  <div class="mt-6 ml-6" style="text-align: center;">
  <form @submit.prevent="signUp">
    <h2>Page d'Inscription</h2>
    <v-col
        cols="12"
        md="4"
        style="margin: auto;"
    >
        <v-text-field
            v-model="name"
            label="Nom complet"
            required
        ></v-text-field>
    </v-col>
    <v-col
        cols="12"
        md="4"
        style="margin: auto;"
    >
        <v-text-field
            v-model="email"
            label="E-mail"
            required
        ></v-text-field>
    </v-col>
    <v-col
        cols="12"
        sm="4"
        style="margin: auto;"
    >
        <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Mot de passe"
            hint="Au moins 8 caractères"
            counter
        ></v-text-field>
    </v-col>
    <v-btn
      color="#F0BF51"
      class="mr-4"
      @click="signUp"
    >
      Valider
    </v-btn>
  </form>
  <v-col
    cols="12"
    sm="4"
    class="mt-2"
    style="margin: auto;"
    >
      Vous avez déja un compte ? <router-link to="/sign-in">Se connecter</router-link>
  </v-col>
  <div v-if="error">
      <div>{{ error }}</div>
  </div>
</div>
</template>
<script>
//import { db } from '../db'
export default {

    name: "SignUp",
    data() { 
    return { 
        email: '', 
        password: '', 
        name: '',
        error: '',
        show1: false,
    }; 
    },
    methods: {
        signUp() {
          this.$store.dispatch('signUp', {
            email: this.email,
            password: this.password,
            name: this.name,
          })
        }
    },
};
</script>
<style scoped>
</style>
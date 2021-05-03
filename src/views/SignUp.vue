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
      color="pink white--text"
      class="mr-4"
      @click="signUp"
    >
      Valider
    </v-btn>
  </form>
  <div v-if="error">
      <div>{{ error }}</div>
  </div>
</div>
</template>
<script>
import database from "../services/database";
export default {

    name: "SignUp",
    data() { 
    return { 
        email: '', 
        password: '', 
        error: '',
        show1: false,
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
<template>
  <v-container fluid>
    <v-layout>
      <!--<h1>Signin Page</h1>-->
      <v-form ref="form" v-model="valid" lazy-validation style="margin: auto">
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :rules="[(v) => !!v || 'Item is required']"
          label="Item"
          required
        ></v-select>

        <v-checkbox
          v-model="checkbox"
          :rules="[(v) => !!v || 'You must agree to continue!']"
          label="Do you agree?"
          required
        ></v-checkbox>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Envoyer
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Annuler </v-btn>
      </v-form>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Signin",
};
</script>
<style scoped>
</style>
<template>
  <div class="mt-6 ml-6" style="text-align: center;">
  <form @submit.prevent="updateProfile">
    <v-col
        cols="12"
        md="10"
        style="margin: auto;"
    >
        <v-text-field
            v-model="profile.name"
            label="Nom complet"
            required
        ></v-text-field>
    </v-col>
    <v-col
        cols="12"
        md="10"
        style="margin: auto;"
    >
        <v-text-field
            v-model="profile.phone"
            label="Phone"
            required
        ></v-text-field>
    </v-col>
    <v-btn
      color="#F0BF51"
      class="mr-4"
      @click="updateProfile"
    >
      Enregistrer les modifications
    </v-btn>
    <v-col
        cols="12"
        md="10"
        style="margin: auto;"
    >
        <v-text-field
            v-model="account.email"
            label="Email"
            required
        ></v-text-field>
    </v-col>
    <v-col
        class="mt-5"
        cols="12"
        md="10"
        style="margin: auto;"
    >
        <v-text-field
            v-model="account.password"
            label="Nouveau mot de passe"
            hint="Au moins 8 caractères"
            counter
        ></v-text-field>
    </v-col>
    <v-col
        class="mt-5"
        cols="12"
        md="10"
        style="margin: auto;"
    >
        <v-text-field
            v-model="confirmPassword"
            label="Confirmer votre mot de passe"
            hint="Au moins 8 caractères"
            counter
        ></v-text-field>
    </v-col>
    <v-btn
      color="#F0BF51"
      class="mr-4"
      @click="resetPassword"
    >
      Reset password
    </v-btn>
  </form>
</div>
</template>

<script>
import { fb, db } from "../firebase";
export default {
  name: "Account",
  
  data(){
    return {
        profile: {
          name:null,
          phone:null,
        },
        account:{
            name:null,
            email:null,
            photoUrl:null,
            emailVerified:null,
            password:null,
            confirmPassword:null,
            uid:null
        }       
    }
  },
  firestore(){
      const user = fb.auth().currentUser;
      return {
        profile: db.collection('profiles').doc(user.uid),
      }
  },
  methods:{
    resetPassword(){
      const auth = fb.auth();          
      auth.sendPasswordResetEmail(auth.currentUser.email).then(() =>  {
        // add Snackbar here
            console.log('email sent');
      }).catch((error) =>  {
          console.log(error);
      });
    },
    updateProfile(){
      this.$firestore.profile.update(this.profile);
      console.log('Prodil edited');
    },
    uploadImage(){},
    confirmPassword(){}
  },

  created(){
  }
};
</script>

<style>

</style>
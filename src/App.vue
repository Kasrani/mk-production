<template>
  <v-app id="app">
    <v-tabs fixed-tabs background-color="deep-purple accent-4" dark>
      <v-tab to="/">Accueil</v-tab>
      <v-tab to="services">Services</v-tab>
    </v-tabs>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
}
</script>
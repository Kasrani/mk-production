<template>
  <v-app id="app">
    <app-navigation></app-navigation>
    <v-content transition="slide-x-transition">
      <!--
      <v-tabs fixed-tabs background-color="deep-purple accent-4" dark>
        <v-tab to="/">Accueil</v-tab>
        <v-tab to="services">Services</v-tab>
        <v-tab to="contact">Contact</v-tab>
      </v-tabs>
      -->
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppNavigation from '@/components/global/AppNavigation';

export default {
    name: 'App',
    components: {
        AppNavigation
    }
};
</script>

<style>
</style>
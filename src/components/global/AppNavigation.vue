<template>
    <span>
      <!--
      <router-link to="/">
        <v-toolbar-title to="/">{{appTitle}}</v-toolbar-title>
      </router-link>
      -->
        <v-tabs fixed-tabs background-color="pink accent-3" dark>
          <v-tab to="/">Accueil</v-tab>
          <v-tab to="services">Services</v-tab>
          <v-tab to="contact">Contact</v-tab>
          <v-tab to="sign-in">SIGN IN</v-tab>
          <v-tab to="join">JOIN</v-tab>
        </v-tabs>
    </span>
</template>
<script>
export default {
    name: 'AppNavigation',
    data() {
        return {
            appTitle: 'mk-production',
            drawer: false,
            items: [
                { title: 'Accueil' },
                { title: 'Services' }, 
                { title: 'Contact' },
                { title: 'Sign In' },
                { title: 'Join' }
            ]
        };
    }
};
</script>
<style scoped>
a {
    color: white!important;
    text-decoration: none;
}
</style>
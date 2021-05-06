  
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="currentUser" v-show="currentUser" v-model="drawer" :mobile-breakpoint="768" app>
      <v-img
        class="pa-4 pt-7"
        src="images/friperie.jpg"
        :height="$route.path === '/todo' ? '220' : '198'"
        gradient="to top right, rgba(100,115,201,.3), rgba(240,191,81,.7)"
      >
        <v-avatar size="50" class="mb-3">
          <img
            src="images/avatars/mkasrani.jpg"
            alt="Mourad"
          >
        </v-avatar>
        <template v-if="currentUser">
          <div class="white--text text-sibtitle-2">{{ currentUser.email }}</div>
          <v-row>
            <v-chip
              v-show="currentUser && (currentUser.email === 'admin@mk-vintage.fr')"
              class="ma-3 mt-5"
              color="green"
              text-color="white"
              x-small>
              Admin
            </v-chip>
            <v-chip
              v-show="currentUser && (currentUser.email !== 'admin@mk-vintage.fr')"
              class="ma-3 mt-5"
              color="green"
              text-color="white"
              x-small>
              Client
            </v-chip>
          </v-row>
          <v-btn class="mt-3" @click="signOut" small>Se deconnecter</v-btn>
        </template>
      </v-img>

      <v-list dense nav>
        <v-list-item v-show="!((currentUser.email !== 'admin@mk-vintage.fr') && (item.title === 'Gestion de stock'))" v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#F0BF51"
      dark
      prominent
      :height="$route.path === '/todo' ? '220' : '150'"
      src="images/friperie.jpg"
      fade-img-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.3), rgba(240,191,81,.7)"
        ></v-img>
      </template>

      <v-container class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon v-if="currentUser" @click="drawer = !drawer" class="mt-2"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search />
        </v-row>
        <v-row>
          <v-toolbar-title class="text-h4 ml-3">{{ $store.state.appTitle }}</v-toolbar-title>
        </v-row>
        <v-row>
          <!-- Live data time -->
          <live-data-time v-if="currentUser && (currentUser.email === 'admin@mk-vintage.fr')" />
          <div v-else class="text-h5 ml-3">Bienvenue !</div>
        </v-row>
        <v-row v-if="$route.path === '/todo'">
          <!-- Add task filed -->
          <filed-add-task></filed-add-task>
        </v-row>
      </v-container>

      <template v-if="!($route.path === '/todo')" v-slot:extension>
        <v-tabs align-with-title>
          <v-tab style="margin-left: 10px;" to="/">Accueil</v-tab>
          <v-tab to="/product-list">Notre sélection</v-tab>
          <v-tab v-if="!currentUser" to="/sign-in">
            <template v-if="!($route.path === '/sign-up')">Connexion</template>
            <template v-else>Inscription</template>
          </v-tab>
          <!--<v-tab v-if="!currentUser" to="/sign-up">Inscription</v-tab>-->
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snackbar />
    </v-main>
  </v-app>
</template>

<script>
import Search from './components/Tools/Search.vue'
import LiveDateTime from './components/Tools/LiveDateTime.vue'
import FieldAddTask from './components/Todo/FieldAddTask.vue'
import Snackbar from './components/global/Snackbar.vue'

export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Home", icon: "mdi-home", to: "/" },
      { title: "Gestion de stock", icon: "mdi-bookmark-plus", to: "/products" },
      { title: "Taches", icon: "mdi-note-plus", to: "/todo" },
      { title: "Vos commandes", icon: "mdi-lock-clock", to: "/orders" },
      { title: "Profil", icon: "mdi-account-box", to: "/account" },
    ]
  }),
  components: {
    Search,
    "live-data-time": LiveDateTime,
    'filed-add-task': FieldAddTask,
    Snackbar
  },
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    }
  },
  mounted() {
    this.$store.dispatch('getTasks')
  },
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
    }
    /*
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('Successfully logged out');
          this.$router.push('/login');
        })
        .catch(error => {
          alert(error.message);
          this.$router.push('/');
        });
    },
    */
  },
};
</script>
<style lang="scss">
.header-container {
  max-width: none!important;
}
.v-slide-group__prev {
display: none !important;
}
</style>
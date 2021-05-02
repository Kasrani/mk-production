  
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :mobile-breakpoint="768" app>
      <v-img
        class="pa-4 pt-7"
        src="images/bg-home.jpg"
        :height="$route.path === '/todo' ? '220' : '198'"
        gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
      >
        <v-avatar size="50" class="mb-3">
          <img
            src="images/avatars/mkasrani.jpg"
            alt="Mourad"
          >
        </v-avatar>
        <div class="white--text text-sibtitle-1 font-weight-bold">Mourad Kasrani</div>
        <div class="white--text text-sibtitle-2">kasrani.mourad@gmail.com</div>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
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
      color="#F50057"
      dark
      prominent
      :height="$route.path === '/todo' ? '220' : '150'"
      src="images/bg-home.jpg"
      fade-img-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.3), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-container class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer" class="mt-2"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search />
        </v-row>
        <v-row>
          <v-toolbar-title class="text-h4 ml-3">{{ $store.state.appTitle }}</v-toolbar-title>
        </v-row>
        <v-row>
          <live-data-time />
        </v-row>
        <v-row v-if="$route.path === '/todo'">
          <!-- Add task filed -->
          <filed-add-task></filed-add-task>
        </v-row>
      </v-container>

      <template v-if="!($route.path === '/todo')" v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
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
      { title: "Missions", icon: "mdi-format-list-checks", to: "/todo" },
      { title: "Services", icon: "mdi-toolbox", to: "/services" },
      { title: "Contact", icon: "mdi-phone", to: "/contact" },
      { title: "Signin", icon: "mdi-login", to: "/sign-in" },
      { title: "Join", icon: "mdi-account-box", to: "/join" },
    ],
  }),
  components: {
    Search,
    "live-data-time": LiveDateTime,
    'filed-add-task': FieldAddTask,
    Snackbar
  },
  mounted() {
    this.$store.dispatch('getTasks')
  }
};
</script>
<style lang="scss" scoped>
.header-container {
  max-width: none!important;
}
</style>
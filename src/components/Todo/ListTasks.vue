<template>
  <v-list subheader flat>
    <v-subheader>Liste des taches</v-subheader>
    <task v-for="task in $store.getters.tasksFiltred" :key="task.id" :task="task" />
  </v-list>
</template>

<script>
import Task from './Task.vue'
export default {
    components: {
    Task,
  },
};
</script>
<template>
  <v-list subheader flat>
    <v-subheader>Liste des articles</v-subheader>
    <draggable v-model="tasks" handle=".handle">
      <task v-for="task in tasks" :key="task.id" :task="task" />
    </draggable>
  </v-list>
</template>

<script>
import draggable from 'vuedraggable'
import Task from './Task.vue'
export default {
    components: {
    Task,
    draggable
  },
  computed: {
    tasks: {
      get() {
        return this.$store.getters.tasksFiltred
      },
      set(value) {
        this.$store.dispatch('setTasks', value)
      }
    }
  }
};
</script>
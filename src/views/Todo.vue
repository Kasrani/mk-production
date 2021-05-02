<template>
  <div class="todo">
    <v-container fluid>
      <filed-add-task></filed-add-task>
      <list-tasks
        v-if="$store.state.tasks.length"></list-tasks>
      <no-tasks
        v-else />
      <button-done-sorting v-if="$store.state.sorting" />  
    </v-container>
  </div>
</template>
<script>
import FieldAddTask from '../components/Todo/FieldAddTask.vue'
import ListTasks from '../components/Todo/ListTasks.vue'
import NoTasks from '../components/Todo/NoTasks.vue'
import ButtonDoneSorting from '../components/Todo/ButtonDoneSorting.vue'
export default {
  name: "Todo",
  components: {
    'filed-add-task': FieldAddTask,
    'list-tasks': ListTasks,
    'no-tasks': NoTasks,
    'button-done-sorting': ButtonDoneSorting
  },
};
</script>
<style lang="scss" scoped>

</style>
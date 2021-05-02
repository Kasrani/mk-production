<template>
  <div class="todo">
    <v-container fluid>
      <filed-add-task></filed-add-task>
      <list-tasks
        v-if="$store.state.tasks.length"></list-tasks>
      <no-tasks
        v-else />
    </v-container>
  </div>
</template>
<script>
import FieldAddTask from '../components/Todo/FieldAddTask.vue'
import ListTasks from '../components/Todo/ListTasks.vue'
import NoTasks from '../components/Todo/NoTasks.vue'
export default {
  name: "Todo",
  components: {
    'filed-add-task': FieldAddTask,
    'list-tasks': ListTasks,
    'no-tasks': NoTasks
  },
};
</script>
<style lang="scss" scoped>

</style>
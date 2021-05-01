<template>
  <div class="todo">
    <v-container fluid>
      <v-text-field
        v-model="newTaskTitle"
        @click:append="addTask"
        @keyup.enter="addTask"
        outlined
        label="Ajouter une tache"
        append-icon="mdi-plus"
        hide-details
        clearable
      >
      </v-text-field>
      <v-list v-if="tasks.length" subheader flat>
        <v-subheader>Liste des taches</v-subheader>
        <div v-for="task in tasks" :key="task.id">
          <v-list-item
            @click="doneTask(task.id)"
            :class="{ 'blue lighten-5': task.done }"
          >
            <template v-slot:default>
              <v-list-item-action>
                <v-checkbox
                  :input-value="task.done"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title
                  :class="{ 'text-decoration-line-through': task.done }"
                >
                  {{ task.title }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn @click.stop="deleteTask(task.id)" icon>
                  <v-icon color="primary lighten-1">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>
      <div v-else class="no-task">
        <v-icon size="70" color="primary"> mdi-check </v-icon>
        <div class="text-5 primary--text">Aucune tache</div>
      </div>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "Todo",
  data() {
    return {
      newTaskTitle: "",
      tasks: [
        //{
        //  id: 1,
        //  title: "Tache par défaut",
        //  done: false,
        //}
      ],
    };
  },
  methods: {
    addTask() {
      let newTask = {
        id: Date.now(),
        title: this.newTaskTitle,
        done: false,
      };
      this.tasks.push(newTask);
      this.newTaskTitle = "";
    },
    doneTask(id) {
      let task = this.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
  },
};
</script>
<style lang="scss" scoped>
.no-task {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
}
</style>
<template>
  <v-dialog :value="true" max-width="290">
    <v-card>
      <v-card-title class="headline"> Modifier la tache </v-card-title>

      <v-card-text>
        Modifier le titre de la tache:
        <v-text-field
          v-model="taskTitle"
          @keyup.enter="saveTask"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="grey" text @click="$emit('close')"> Annuler </v-btn>

        <v-btn color="pink" text @click="saveTask" :disabled="taskTitleInvalid">
          Enregistrer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      taskTitle: null,
    };
  },
  computed: {
    taskTitleInvalid() {
      return !this.taskTitle || this.taskTitle === this.task.title;
    },
  },
  methods: {
    saveTask() {
      if (!this.taskTitleInvalid) {
        let payload = {
          id: this.task.id,
          title: this.taskTitle,
        };
        this.$store.dispatch("updateTaskTitle", payload);
        this.$emit("close");
        this.$vuetify.goTo(0, { durantion: 0 })
      }
    },
  },
  mounted() {
    this.taskTitle = this.task.title;
  },
};
</script>

<style>
</style>
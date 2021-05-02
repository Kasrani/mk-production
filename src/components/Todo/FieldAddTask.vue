<template>
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
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: ''
    };
  },
  methods: {
    addTask() {
      this.$store.dispatch('addTask', this.newTaskTitle)
      this.newTaskTitle = ''

    },
  },
};
</script>
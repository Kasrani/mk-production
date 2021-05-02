<template>
  <v-dialog :value="true" max-width="290">
    <v-card>
      <v-card-title class="headline">
        Supprimer la tache ?
      </v-card-title>

      <v-card-text>
        Vous êtes sûr de supprimer cette tache ?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="grey" text @click="$emit('close')">
          Non
        </v-btn>

        <v-btn color="pink" text @click="$store.dispatch('deleteTask', task.id)">
          Oui
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['task']
};
</script>

<style>
</style>
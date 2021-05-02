<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="pink" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <dialog-edit
      v-if="dialogs.edit"
      @close="dialogs.edit = false"
      :task="task"
    />
    <dialog-delete
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
      :task="task"
    />
  </div>
</template>

<script>
import DialogDelete from "./Dialogs/DialogDelete"
import DialogEdit from "./Dialogs/DialogEdit"
export default {
  components: {
    "dialog-delete": DialogDelete,
    "dialog-edit": DialogEdit
  },
  props: ['task'],
  data: () => ({
    dialogs: {
        edit: false,
      delete: false,
    },
    items: [
      {
        title: "Modifier",
        icon: "mdi-pencil",
        click() {
          this.dialogs.edit = true
        },
      },
      {
        title: "Planifier",
        icon: "mdi-calendar",
        click() {
          console.log("hello");
        },
      },
      {
        title: "Supprimer",
        icon: "mdi-delete",
        click() {
          this.dialogs.delete = true
        },
      },
    ],
  }),
  methods: {
    handleClick(index) {
      this.items[index].click.call(this)
    },
  },
};
</script>

<style>
</style>
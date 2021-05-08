<template>
  <v-dialog v-model="show" max-width="500">
    <v-card>
      <v-card-title class="headline"> Mon panier </v-card-title>

      <v-card-text>
        <!-- v-card in modal -->
        <v-card
          class="mx-auto"
          max-width="100%"
          outlined
          v-for="item in this.$store.state.cart"
          :key="item.id"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">OVERLINE</div>
              <v-list-item-title class="headline mb-1">
                {{ item.productName }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.productPrice | currencyEuro }}</v-list-item-subtitle>
              <v-list-item-subtitle>Quantité : {{ item.productQuantity }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-img
            :src="item.productImage"
            max-height="80"
            max-width="80"
          ></v-img>
        </v-card>
      </v-card-text>

      <v-card-actions class="pb-6">
        <v-spacer></v-spacer>

        <v-btn color="amber darken-3"> Continuer vos achats </v-btn>

        <v-btn color="amber darken-3" text @click.stop="show = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "MiniCart",
  props: ["visible"],
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
};
</script>

<style>
</style>
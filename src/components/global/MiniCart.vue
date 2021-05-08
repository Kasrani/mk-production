<template>
  <v-dialog v-model="show" max-width="500">
    <v-card>
      <v-card-title class="headline"> Mon panier </v-card-title>

      <v-card-text>
        <!-- v-card in modal -->
        <v-card
          class="mx-auto mb-3"
          max-width="100%"
          outlined
          v-for="item in this.$store.state.cart"
          :key="item.id"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ item.productName }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.productPrice | currencyEuro }}</v-list-item-subtitle>
              <v-list-item-subtitle>Quantité : {{ item.productQuantity }}</v-list-item-subtitle>
            </v-list-item-content>
            
            <v-list-item-action>
                <v-img
                    max-width="150"
                    max-height="100"
                    :src="item.productImage"
                ></v-img>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </v-card-text>

      <v-card-actions class="pb-6">
        <v-spacer></v-spacer>
        <v-btn color="amber darken-3" @click.stop="checkout"> Checkout </v-btn>
        <v-btn color="amber darken-3" text @click.stop="show = false">
          Continuer vos achats
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
  methods: {
    checkout() {
      this.$store.state.showCart.show = false
      this.$router.push('/checkout')
    }
  }
};
</script>

<style>

</style>
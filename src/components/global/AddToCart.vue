<template>
  <div class="add-to-cart">
    <v-btn color="amber darken-3" text @click="addToCart">
      Ajouter au panier
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "add-to-cart",
  props: {
    name: String,
    price: String,
    image: String,
    pId: String,
  },
  data() {
    return {
      item: {
        productName: this.name,
        productPrice: this.price,
        productImage: this.image,
        productId: this.pId,
        productQuantity: 1,
      }
    };
  },
  methods: {
    addToCart() {
    this.$store.commit("openModalToCart");
      this.$store.commit("addToCart", this.item);
    },
  },
};
</script>

<style>
</style>
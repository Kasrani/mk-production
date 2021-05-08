<template>
<v-app>
  <div class="products mt-10" id="products">
    <h1 class="text-center pb-6">Notre liste de produits</h1>
    <v-row class="">
      <v-col v-for="(product, index) in products" :key="index">
        <v-card
          class="mx-auto"
          max-width="344"
        >
          <!-- carousssssssssssssssssssssssssssssssssssssssssssssssssssssssseeeeeeeeeeeeeeeeeeeellllllllllllll-->
          <v-carousel
            :continuous="false"
            show-arrows-on-hover
            hide-delimiter-background
            delimiter-icon="mdi-circle-slice-8"
            height="200"
          >
            <v-carousel-item
              v-for="(image, index) in product.images"
              :key="index.id"
            >
              <v-sheet
                height="100%"
                tile
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-3 pa-2">
                    <v-img
                      :src="image"
                      height="200px"
                    ></v-img>
                  </div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
          <!-- carousssssssssssssssssssssssssssssssssssssssssssssssssssssssseeeeeeeeeeeeeeeeeeeellllllllllllll-->
          <v-card-title>
            {{ product.name }}
          </v-card-title>

          <v-card-subtitle>
            {{ product.price | currencyEuro }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn
              color="amber darken-3"
              text
            >
              Ajouter au panier
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              icon
            >
              <v-icon color="amber darken-1">mdi-heart</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</v-app>
</template>

<script>
import {db} from '../firebase';
export default {
  name: "Products-list",
  data(){
    return {
        products: [],
    }
  },
  methods:{
    /*
    getImage(images){
      return images[0];
    }
    */
  },
  firestore(){
    return {
      products: db.collection('products'),
    }
  },
};
</script>

<style lang="scss" scoped>
.v-item-group {
    padding-bottom: 20px;
}
</style>>

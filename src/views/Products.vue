<!--
<template>
  <div class="mt-6 ml-6">
    <div class="mt-6 ml-6">
      <h2>Gestion des produits :</h2>
      <v-col cols="12" md="4">
        <v-text-field v-model="product.name" label="Nom" required></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field v-model="product.price" label="Prix"></v-text-field>
      </v-col>
      <v-btn @click="addProduct" color="#F0BF51" class="ml-3">
        Créer un article
      </v-btn>
    </div>
  </div>
</template>
<script>
import { db } from "../firebase";
export default {
  name: "Products",
  data() {
    return {
      product: {
        name: null,
        price: null,
      }
    };
  },
  methods: {
    addProduct() {
      db.collection("products").add(this.product)
      .then((docRef) => {
        console.log("Product written with ID: ", docRef.id);
        this.reset();
      })
      .catch((error) => {
        console.error("Error adding product: ", error);
      })
    },
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
    }
  },
};
</script>
<style scoped>
</style>
-->


<template>
    <v-data-table
    :headers="headers"
    :items="products"
    :item-key="id"
    sort-by="price"
    class="elevation-1"
  >
  <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Mes Produits</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              color="amber darken-3"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Ajouter un article
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="product.name"
                      label="Nom"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="product.mark"
                      label="Marque"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="product.price"
                      label="Prix"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey lighten-1"
                text
                @click="close"
              >
                Annuler
              </v-btn>
              <v-btn
                color="amber darken-3"
                text
                @click="addProduct"
              >
                Enregistrer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editProduct(item.id)"
      >
        mdi-pencil
      </v-icon>
      <v-dialog v-model="dialogDelete" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="red lighten-2"
              dark
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey lighten-1" text @click="closeDelete">Annuler</v-btn>
              <v-btn color="amber darken-3" text @click="deleteProduct(item.id)">Supprimer</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </template>
    <template v-slot:no-data>
      <v-btn
        small
        color="amber darken-3"
      >
        Refresh
      </v-btn>
    </template>
</v-data-table>
</template>
<script>
import { db } from "../firebase";
export default {
  name: "ProductList",
  data() {
    return {
      product: {
        name: null,
        mark: null,
        price: null,
      },
      products: [],
      dialog: false,
      dialogDelete: false,
      headers: [
          {
            text: 'Nom',
            align: 'start',
            value: 'name',
            sortable: false
          },
          { text: 'Marque', value: 'mark' },
          { text: 'Prix', value: 'price' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
            name: '',
            price: 0,
            mark: '',
        },
        defaultItem: {
            name: '',
            price: 0,
            mark: '',
        },
    };
  },

  computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },


  methods: {
      addProduct() {
        db.collection("products").add(this.product)
        .then((docRef) => {
          console.log("Product written with ID: ", docRef.id);
          this.reset();
        })
        .catch((error) => {
          console.error("Error adding product: ", error);
        })
        this.close()
      },
      refreshList() {
        this.addProduct();
      },

      reset() {
        Object.assign(this.$data, this.$options.data.apply(this));
      },
 
      // edit product
      editProduct() {
        
      },
      // delete product
      deleteProduct(doc) {
        this.$emit('deleteProduct', doc);
        db.collection("products").doc(doc).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        this.refreshList();
        this.dialogDelete = false;
      },
      // delete product validation
      closeDelete() {
        this.dialogDelete = false;
      },

      // close modal
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      }, 
  },
  created() {
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        //this.products = querySnapshot;
        querySnapshot.forEach((doc) => {
          //this.products.push(doc);
          //console.log(doc.id, " => ", doc.data());
          let product = doc.data()
          product.id = doc.id
          this.products.push(product)
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  },
};
</script>
<style scoped>
</style>
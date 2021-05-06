<template>
  <div class="ma-5">
    <!-- add product modal -->
    <v-dialog v-model="dialog" max-width="500px">
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
        <span class="headline">Ajouter un article</span>
        </v-card-title>
        <v-card-text>
        <v-container grid-list-md>
            <v-layout wrap>
            <v-flex xs12 sm6 md4>
                <v-text-field v-model="product.name" label="Nom"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
                <v-text-field v-model="product.mark" label="Marque"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
                <v-text-field v-model="product.price" label="Prix"></v-text-field>
            </v-flex>
            </v-layout>
        </v-container>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey lighten-1" text @click="close">Annuler</v-btn>
        <v-btn color="amber darken-3" text @click="addProduct">Enregistrer</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>

    <!-- Edit product modal -->
    <v-dialog v-model="dialogEdit" max-width="500px">
    <v-card>
        <v-card-title>
        <span class="headline">Modifier l'article</span>
        </v-card-title>
        <v-card-text>
        <v-container grid-list-md>
            <v-layout wrap>
            <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedProduct.name" label="Nom"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedProduct.mark" label="Marque"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedProduct.price" label="Prix"></v-text-field>
            </v-flex>
            </v-layout>
        </v-container>
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey lighten-1" text @click="closeEdit">Annuler</v-btn>
        <v-btn color="amber darken-3" text @click="updateProduct">Enregistrer</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>

    <!-- Edit product modal -->
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">Êtes-vous sûr de bien vouloir supprimer ce produit?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey lighten-1" text @click="closeDelete">Annuler</v-btn>
          <v-btn color="amber darken-3" text @click="deleteProduct">Supprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- data table -->
    <v-data-table :headers="headers" :items="products" item-key="id" class="elevation-1">
    <template v-slot:item.actions="props">
      <!--
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.mark }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        -->
        <td class="">
        <v-btn
            color="green lighten-2"
            dark
            icon
            @click="setEditProduct(props.item)"
        >
            <v-icon small>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          color="red lighten-2"
          dark
          icon
          @click="setDeleteProduct(props.item)"
        >
            <v-icon small>mdi-delete</v-icon>
        </v-btn>
        </td>
    </template>
    </v-data-table>
</div>
</template>

<script>
import { db } from "../firebase";
export default {
  name: "ProductList",
  data() {
    return {
      product: {
        name: '',
        mark: '',
        price: '',
      },
      products: [],
      activeItem: null,
      dialog: false,
      dialogDelete: false,
      dialogEdit: false,
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
        editedProduct: {
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

  // load product
  created() {
    db.collection("products")
      .get()
      .then((querySnapshot) => {
        //this.products = querySnapshot;
        querySnapshot.forEach((doc) => {
          let product = doc.data()
          product.id = doc.id
          this.products.push(product)
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  },

    methods: {
      // Realetime update
      wathcher() {
        db.collection("products").onSnapshot((querySnapshot) => {
            this.products = [];
            querySnapshot.forEach((doc) => {
                let product = doc.data()
                product.id = doc.id
                this.products.push(product)
            });  
        });
      },

      // add product
      addProduct() {
        db.collection("products").add(this.product)
        .then((docRef) => {
          console.log("Product written with ID: ", docRef.id);
          this.reset();
          this.wathcher();
        })
        .catch((error) => {
          console.error("Error adding product: ", error);
        })
        this.close()
      },
      
      // reset form
      reset() {
        Object.assign(this.$data, this.$options.data.apply(this));
      },
 
      // edit product
      setEditProduct(doc) {
          this.dialogEdit = true;
          this.editedProduct.name = doc.name;
          this.editedProduct.mark = doc.mark;
          this.editedProduct.price = doc.price;
          this.activeItem = doc.id;
      },

      // update product
      updateProduct(){
        db.collection("products").doc(this.activeItem).update({
            name: this.editedProduct.name,
            mark: this.editedProduct.mark,
            price: this.editedProduct.price
        })
        .then(() => {
            console.log("Document successfully updated!");
            this.dialogEdit = false;
            this.wathcher();
            //location.reload();
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
      },

      // Select product for delete
      setDeleteProduct(doc) {
        this.dialogDelete = true;
        this.activeItem = doc.id;
      },

      // Delete product
      deleteProduct() {
        console.log(this.activeItem);
        db.collection("products").doc(this.activeItem).delete().then(() => {
            this.dialogDelete = false;
            console.log("Document successfully deleted!");
            this.wathcher();
            //location.reload();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
      },

      // delete product validation
      closeDelete() {
        this.dialogDelete = false;
      },
      closeEdit() {
        this.dialogEdit = false;
      },
      
      // close modal
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedProduct = Object.assign({}, this.defaultProduct)
          this.editedIndex = -1
        })
      }, 
  },
};
</script>
<style scoped>
</style>
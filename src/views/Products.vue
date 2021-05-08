<template>
  <div class="ma-5">
    <!-- add product modal -->
    <v-dialog v-model="dialog" max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          color="amber darken-3"
          dark
          class="mb-2"
          v-bind="attrs"
          v-on="on"
          @click="addNew"
        >
          Ajouter un article
        </v-btn>
      </template>
      <v-card class="pb-2 pr-2">
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
                <v-text-field
                  v-model="product.mark"
                  label="Marque"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="product.price"
                  label="Prix"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-btn small block class="amber darken-3" @click="onPickImage">
                  <v-icon left> mdi-cloud-upload </v-icon>
                  Importer les photos
                </v-btn>
                <input
                  type="file"
                  style="display: none"
                  ref="fileInput"
                  accept="image/*"
                  @change="uploadImage"
                />
              </v-flex>
            </v-layout>
            <v-row class="mt-1">
              <div v-for="(image, index) in product.images" :key="index">
                <v-col>
                  <v-img max-height="100" max-width="150" :src="image"></v-img>
                  <v-btn
                    color="grey lighten-1"
                    fab
                    x-small
                    @click="deleteImage(image, index)"
                  >
                    <v-icon color="white">mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </div>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="">
          <v-spacer></v-spacer>
          <v-btn color="grey lighten-1" text @click="close">Annuler</v-btn>
          <v-btn
            color="amber darken-3"
            text
            @click="addProduct"
            v-if="mode == 'new'"
          >
            Ajouter
          </v-btn>
          <v-btn
            color="amber darken-3"
            text
            @click="updateProduct"
            v-if="mode == 'edit'"
          >
            Modifier
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- data table -->
    <v-data-table
      :headers="headers"
      :items="products"
      item-key="product"
      class="elevation-1"
    >
      <template v-slot:item.actions="product">
        <!--
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.mark }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        -->
        <!--<td><v-img max-width="100" max-height="150" :src="{{props.item.images}}"></v-img></td>-->
        <td class="">
          <v-btn
            color="green lighten-2"
            dark
            icon
            @click="editProduct(product.item)"
          >
            <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            color="red lighten-2"
            dark
            icon
            @click="deleteProduct(product.item)"
          >
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { db, fb } from "../firebase";
import Swal from 'sweetalert2'
export default {
  name: "ProductList",
  data() {
    return {
      product: {
        name: null,
        mark: null,
        price: null,
        images: [],
      },
      products: [],
      dialog: false,
      mode: null,
      headers: [
        {
          text: "Nom",
          align: "start",
          value: "name",
          sortable: false,
        },
        { text: "Marque", value: "mark" },
        { text: "Prix", value: "price" },
        //{ text: 'Images', value: 'images' },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  firestore() {
    return {
      products: db.collection('products'),
      //users: db.collection('users'),
    }
  },
  methods: {
    // Delete image
    deleteImage(img, index) {
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index, 1);
      image
        .delete()
        .then(() => {
          console.log("image deleted");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // On pick image
    onPickImage() {
      this.$refs.fileInput.click();
    },

    // Upload images
    uploadImage(e) {
      let file = e.target.files[0];

      var storageRef = fb.storage().ref("products/" + file.name);

      let uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.product.images.push(downloadURL);
            console.log("File available at", downloadURL);
          });
        }
      );
    },

    // rest form
    reset() {
      this.product = {
        name: null,
        mark: null,
        price: null,
        images: [],
      }
    },

    // new product
    addNew(){
      this.mode = 'new';
      console.log(this.mode);
      this.reset();
    },

    // add product
    addProduct() {
      this.$firestore.products.add(this.product);
      /*
      Swal.fire(
        'Produit crée avec sucées',
        'Produit crée avec sucées',
        'success'
      )
      */
      this.close();
    },

    // edit product
    editProduct(product) {
      this.mode = 'edit';
      this.product = product;
      this.dialog = true;
    },

    // update product
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product)
      this.dialog = false;
      /*
      Swal.fire(
        'Modifié !',
        'Votre produit a été modifié.',
        'success'
      )
      */
    },

    // Delete product
    deleteProduct(doc) {
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#FF6F00',
        confirmButtonColor: '#BDBDBD',
        confirmButtonText: 'Oui, supprimez-le !'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$firestore.products.doc(doc.id).delete()
          Swal.fire(
            'Supprimé !',
            'Votre produit a été supprimé.',
            'success'
          )
        }
      })
    },
    closeEdit() {
      this.dialogEdit = false;
    },

    // close modal
    close() {
      this.dialog = false;
    },
  },
  // load product
  created() {
    
  },
};
</script>
<style scoped>
</style>
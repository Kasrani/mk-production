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
            <v-flex xs12 sm6 md4>
                <v-btn
                  small
                  block
                  class="amber darken-3"
                  @click="onPickImage">
                    <v-icon left>
                      mdi-cloud-upload
                    </v-icon>
                    Importer les photos
                </v-btn>
                <input
                  type="file"
                  style="display: none;"
                  ref="fileInput"
                  accept="image/*"
                  @change="uploadImage"
                />
            </v-flex>
            
            </v-layout>
            <v-row class="mt-1">
              <div v-for="(image, index) in product.images" :key="index">

                <v-col>

                <v-img
                  max-height="100"
                  max-width="150"
                  :src="image"
                ></v-img>
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
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey lighten-1" text @click="close">Annuler</v-btn>
        <v-btn color="amber darken-3" text @click="addProduct">Enregistrer</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>

    <!-- Edit product modal -->
    <v-dialog v-model="dialogEdit" max-width="800px">
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
            <v-flex xs12 sm6 md4>
                <v-btn
                  small
                  block
                  class="amber darken-3"
                  @click="onPickImage">
                    <v-icon left>
                      mdi-cloud-upload
                    </v-icon>
                    Importer les photos
                </v-btn>
                <input
                  type="file"
                  style="display: none;"
                  ref="fileInput"
                  accept="image/*"
                  @change="uploadImage"
                />
            </v-flex>
            </v-layout>
            <v-row class="mt-1">
              <div v-for="(image, index) in editedProduct.images" :key="index">

                <v-col>

                <v-img
                  max-height="100"
                  max-width="150"
                  :src="image"
                ></v-img>
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
        <!--<td><v-img max-width="100" max-height="150" :src="{{props.item.images}}"></v-img></td>-->
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
import { db, fb } from "../firebase";
export default {
  name: "ProductList",
  data() {
    return {
      product: {
        name: '',
        mark: '',
        price: '',
        images: []
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
          //{ text: 'Images', value: 'images' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedProduct: {
            name: '',
            price: 0,
            mark: '',
            images: []
        },
        defaultItem: {
            name: '',
            price: 0,
            mark: '',
            images: []
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
      // Delete image
      deleteImage(img, index) {

        let image = fb.storage().refFromURL(img);
        this.product.images.splice(index, 1);
        image.delete().then(() => {
          console.log('image deleted');
        }).catch((error) => {
          console.log(error);
        })
      },

      // On pick image
      onPickImage() {
        this.$refs.fileInput.click()
      },

      // Upload images
      uploadImage(e) {

        let file = e.target.files[0];

        var storageRef = fb.storage().ref('products/'+ file.name);

        let uploadTask = storageRef.put(file);

        uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot);
          }, 
          (error) => {
            // Handle unsuccessful uploads
            console.log(error);
          }, 
          () => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images.push(downloadURL)
              console.log('File available at', downloadURL);
            });
          }
        );
      },

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
          this.editedProduct.images = doc.images;
          //console.log(this.editedProduct.images)
          this.activeItem = doc.id;
      },

      // update product
      updateProduct(){
        db.collection("products").doc(this.activeItem).update({
            name: this.editedProduct.name,
            mark: this.editedProduct.mark,
            price: this.editedProduct.price,
            images: this.editedProduct.images
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
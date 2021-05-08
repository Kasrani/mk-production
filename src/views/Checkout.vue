<template>
    <v-app>
        <v-row class="mt-5 ml-5">
            <v-col><h1>Ma sélection</h1>
            <v-card-text>
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
                    <v-btn @click="$store.commit('removeFromCart', item)" class="mt-2" x-small>Supprimer l'article</v-btn>
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
            </v-col>
            <v-col class="mt-4"><h3>Prix totale</h3></v-col>
        </v-row>
    </v-app>
</template>

<script>

export default {
    name: 'Checkout',
}
</script>
<style>

</style>

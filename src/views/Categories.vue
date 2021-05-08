<template>
<v-row class="pl-4 pr-4">
  <v-col>
  <v-card
    :loading="loading"
    class="mx-auto my-6"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://i.imgur.com/1NNGyBy.png"
    ></v-img>

    <v-card-title>SÉLECTION BON PLAN</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        € • 10 - 25
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Catégorie 1</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="amber darken-3 white--text"
        column
      >
        <v-chip>Homme</v-chip>

        <v-chip>Femme</v-chip>

        <v-chip>Enfants</v-chip>

      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="amber darken-2"
        text
        @click="reserve"
      >
        Découvrez nos offres
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-col>

  <!-- category 2 -------------------------------------------------------------------------------------------------------->
  <!-- category 2 -------------------------------------------------------------------------------------------------------->
  <v-col>
  <v-card
    :loading="loading"
    class="mx-auto my-6"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://i.imgur.com/1NNGyBy.png"
    ></v-img>

    <v-card-title>SÉLECTION BON PLAN</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        € • 10 - 25
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Catégorie 2</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="amber darken-3 white--text"
        column
      >
        <v-chip>Homme</v-chip>

        <v-chip>Femme</v-chip>

        <v-chip>Enfants</v-chip>

      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="amber darken-2"
        text
        @click="reserve"
      >
        Découvrez nos offres
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-col>
  
  <!-- category 3 -------------------------------------------------------------------------------------------------------->
  <!-- category 3 -------------------------------------------------------------------------------------------------------->

  <v-col>
  <v-card
    :loading="loading"
    class="mx-auto my-6"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://i.imgur.com/1NNGyBy.png"
    ></v-img>

    <v-card-title>SÉLECTION BON PLAN</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        € • 10 - 25
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Catégorie 3</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="amber darken-3 white--text"
        column
      >
        <v-chip>Homme</v-chip>

        <v-chip>Femme</v-chip>

        <v-chip>Enfants</v-chip>

      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="amber darken-2"
        text
        @click="reserve"
      >
        Découvrez nos offres
      </v-btn>
    </v-card-actions>
  </v-card>
  </v-col>
</v-row>
</template>
<script>
  export default {
    name: 'Categories',
    data: () => ({
      loading: false,
      selection: 0,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>
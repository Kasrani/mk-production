<template>
  <v-text-field
    :value="$store.state.search"
    @input="$store.commit('setSearch', $event)"
    @focus="searchClosed = false"
    @blur="searchClosed = true"
    class="expanding-search mt-3"
    :class="{ 'closed': searchClosed && !$store.state.search } "
    placeholder="Rechercher.."
    prepend-inner-icon="mdi-magnify"
    Filled
    dense
    clearable
  ></v-text-field>
</template>

<script>
export default {
    data() {
        return {
            searchClosed: true
        }
    }
}
</script>

<style lang="scss">
.expanding-search.v-text-field>.v-input__control>.v-input__slot:before {
    border-style: none;
}
.expanding-search.v-text-field>.v-input__control>.v-input__slot:after {
    border-style: none;
}
.expanding-search {
    transition: max-width 0.3s;
}
.closed {
    max-width: 25px!important;
}
</style>
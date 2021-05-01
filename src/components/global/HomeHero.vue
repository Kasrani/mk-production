<template>
    <v-container fluid fill-height class="home-hero" style="max-height: 100vh;">
        <v-layout justify-center align-center column pa-5>
            <div class="title text-center font-weight-black white--text">MK-PRODUCTION</div>
            <div class="title text-center font-weight-black white--text">DESIGN AND DEVELOPMENT</div>
            <div class="subtitle-1 text-center font-weight-bold white--text">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
            <v-btn class="mt-5 pink accent-3 white--text">Bonjour !</v-btn>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'HomeHero'
};
</script>

<style scoped>
.home-hero {
    background: url('https://i.imgur.com/nK2Uq1J.jpg');
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>
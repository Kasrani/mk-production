<template>
    <v-container fluid fill-height class="home-hero" style="max-height: 40vh;">
    </v-container>
</template>

<script>
export default {
    name: 'HomeHero'
};
</script>

<style scoped>
.home-hero {
    background: url('https://i.imgur.com/fbG80rn.jpg');
    background-size: contain;
    background-position-x: center;
    background-position-y: center;
    width: calc(100% - 40px);
    height: 100%;
    margin: 20px;
}
</style>
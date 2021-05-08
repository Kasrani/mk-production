<template>
    <span>
        <!--<home-hero></home-hero>-->
        <!--<home-details></home-details>-->
        <categories></categories>
    </span>
</template>

<script>
//import HomeHero from '@/components/global/HomeHero';
//import HomeDetails from '@/components/global/HomeDetails';
import Categories from './Categories.vue';

export default {
    name: 'Home',
    components: {
        //HomeDetails,
        //HomeHero,
        Categories
    }
};
</script>
<style lang="scss" scoped>
h1 {
  color: #757575;
}
</style>

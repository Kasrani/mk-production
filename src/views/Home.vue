<template>
    <span>
        <home-hero></home-hero>
        <home-details></home-details>
    </span>
</template>

<script>
import HomeHero from '@/components/global/HomeHero';
import HomeDetails from '@/components/global/HomeDetails';

export default {
    name: 'Home',
    components: {
        HomeDetails,
        HomeHero
    }
};
</script>
<style lang="scss" scoped>
h1 {
  color: #757575;
}
</style>

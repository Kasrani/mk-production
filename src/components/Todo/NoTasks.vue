<template>
  <div class="no-task">
    <v-icon size="70" color="primary"> mdi-check </v-icon>
    <div class="text-5 primary--text">Aucune tache</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.no-task {
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
}
</style>
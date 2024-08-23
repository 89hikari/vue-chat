<script setup lang="ts">
import TheHeader from "./TheHeader.vue";
</script>

<template>
  <div class="left-column h-screen shadow-md bg-white">
    <TheHeader />
  </div>
</template>

<style scoped lang="scss">
.left-column {
  max-width: 33vw;
  @media (min-width: 1276px) {
    width: 25vw;
  }
}
</style>

<script setup lang="ts">
import AppTransition from "./components/AppTransition.vue";
import useAuthentificated from "./composables/useAuthentificated";

// Calling composable function to run checks of user auth
useAuthentificated().watchAuth();
</script>

<template>
  <router-view v-slot="{ Component }">
    <AppTransition>
      <component :is="Component" />
    </AppTransition>
  </router-view>
</template>

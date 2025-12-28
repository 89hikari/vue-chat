<script setup lang="ts">
import AppTransition from "./components/AppTransition.vue";
import useAuthenticated from "./composables/useAuthenticated";

// Calling composable function to run checks of user auth
useAuthenticated().watchAuth();
</script>

<template>
  <router-view v-slot="{ Component }">
    <AppTransition>
      <component :is="Component" />
    </AppTransition>
  </router-view>
</template>

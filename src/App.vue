<script setup lang="ts">
import useAuthentificated from "./composables/useAuthentificated";

// Calling composable function to run checks of user auth
useAuthentificated().watchAuth();
</script>

<template>
  <RouterView />
</template>

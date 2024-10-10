<script setup lang="ts">
import { useUserStore } from "@/stores/user.store";

const user = useUserStore();
</script>

<template>
  <h3 class="text-xl font-semibold mb-10 flex-grow-0 text-center">Menu</h3>
  <button
    class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100"
    @click="user.logout"
  >
    Logout
  </button>
</template>

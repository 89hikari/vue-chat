<script setup lang="ts">
const emit = defineEmits<{
  (e: "submit"): void;
}>();
const submit = () => emit("submit");
</script>

<template>
  <button
    class="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden text-sm font-semibold text-white rounded-md bg-gradient-neon hover:shadow-neon-pink transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-neon-purple focus:ring-offset-2 focus:ring-offset-dark-bg"
    @click="submit"
  >
    <span class="relative z-10"> Submit </span>
  </button>
</template>

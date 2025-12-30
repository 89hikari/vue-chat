<script setup lang="ts">
const model = defineModel<string>();
</script>
<template>
  <textarea
    v-bind="$attrs"
    v-model="model"
    rows="2"
    class="block p-4 w-full text-sm text-neon-cyan bg-dark-card resize-none rounded-md border border-neon-cyan border-opacity-30 focus:ring-2 focus:ring-neon-purple focus:border-neon-cyan focus:outline-0 focus:shadow-neon-purple transition-all duration-300 placeholder:text-neon-cyan placeholder:opacity-40"
  ></textarea>
</template>

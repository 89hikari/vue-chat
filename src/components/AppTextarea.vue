<script setup lang="ts">
const model = defineModel<string>();
</script>
<template>
  <textarea
    v-bind="$attrs"
    v-model="model"
    rows="2"
    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 resize-none rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-0 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  ></textarea>
</template>

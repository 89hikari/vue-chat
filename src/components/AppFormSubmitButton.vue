<script setup lang="ts">
const emit = defineEmits<{
  (e: "submit"): void;
}>();
const submit = () => emit("submit");
</script>

<template>
  <button
    class="relative inline-flex 2 items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
    @click="submit"
  >
    <span
      class="relative px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
    >
      Submit
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  icon: string;
}
defineProps<Props>();
</script>

<template>
  <button>
    <i
      class="pi p-3 hover:bg-gray-100 rounded-full cursor-pointer transition ease-in-out duration-200"
      :class="icon"
    ></i>
  </button>
</template>

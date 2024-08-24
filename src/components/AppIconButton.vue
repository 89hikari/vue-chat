<script setup lang="ts">
interface Props {
  type: string;
}
defineProps<Props>();
</script>

<template>
  <i
    class="pi p-3 hover:bg-gray-100 rounded-full cursor-pointer transition ease-in-out duration-200"
    :class="type"
  ></i>
</template>

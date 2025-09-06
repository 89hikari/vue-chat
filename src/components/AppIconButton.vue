<script setup lang="ts">
interface Props {
  icon: string;
  text?: string;
}
defineProps<Props>();
const emit = defineEmits<{
  (e: "click"): void;
}>();
const click = () => emit("click");
</script>

<template>
  <div
    @click="click"
    class="flex items-center justify-center hover:bg-gray-100 rounded-full cursor-pointer transition ease-in-out duration-200 p-3"
  >
    <button class="flex">
      <i class="pi" :class="icon"></i>
    </button>
    <p class="ml-2" v-if="text">{{ text }}</p>
  </div>
</template>

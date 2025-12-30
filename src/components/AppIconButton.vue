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
  <div @click="click" class="flex items-center">
    <button
      type="button"
      class="flex items-center justify-center w-10 h-10 rounded-full text-neon-cyan hover:bg-neon-cyan/10 focus:outline-none focus:ring-2 focus:ring-neon-cyan/30 transition-colors duration-150"
      aria-label="menu"
    >
      <i class="pi" :class="icon"></i>
    </button>
    <p class="ml-2 text-neon-cyan" v-if="text">{{ text }}</p>
  </div>
</template>

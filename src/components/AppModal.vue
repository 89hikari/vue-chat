<script setup lang="ts">
import { computed, ref } from "vue";

const isOpen = ref<boolean>(false);
const isModalVisible = computed(() => isOpen.value);
const toggle = () => (isOpen.value = !isOpen.value);

defineExpose({
  toggle,
});
</script>
<template>
  <transition name="fade">
    <div v-if="isModalVisible">
      <div @click="toggle" class="fixed bg-black opacity-70 inset-0 z-10"></div>
      <div
        class="fixed w-full max-w-lg p-3 z-10 rounded-xl shadow-lg bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <slot />
      </div>
    </div>
  </transition>
</template>
<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease-in;
}
</style>

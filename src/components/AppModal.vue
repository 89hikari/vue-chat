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
  <teleport to="body">
    <div v-if="isModalVisible">
      <div @click="toggle" class="modal-overlay"></div>

      <Transition name="modal-scale" appear>
        <div
          v-if="isModalVisible"
          class="modal-panel"
          role="dialog"
          aria-modal="true"
        >
          <slot />
        </div>
      </Transition>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  id?: number | string;
  url?: string | null;
  size?: number;
}

const props = defineProps<Props>();
const sizePx = computed(() => `${(props.size || 16) * 4}px`);
const classNames = computed(
  () =>
    "rounded-full bg-gray-300 flex items-center justify-center overflow-hidden"
);
</script>
<template>
  <div :class="classNames" :style="{ width: sizePx, height: sizePx }">
    <img
      :src="url || `/vue-chat/api/users/${id}/avatar`"
      alt="User Avatar"
      class="w-full h-full object-cover"
    />
  </div>
</template>

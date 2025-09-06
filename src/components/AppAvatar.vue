<script setup lang="ts">
import { computed } from "vue";

interface Props {
  id?: number | string;
  url?: string | null;
  size?: number;
}

const props = defineProps<Props>();
const classNames = computed(() => ({
  "rounded-full bg-gray-300 flex items-center justify-center": true,
  [`w-${props.size || 16} h-${props.size || 16}`]: true,
}));
</script>
<template>
  <div :class="[classNames]">
    <img
      :src="url || `/api/users/${id}/avatar`"
      alt="User Avatar"
      class="w-full h-full rounded-full object-cover"
    />
  </div>
</template>

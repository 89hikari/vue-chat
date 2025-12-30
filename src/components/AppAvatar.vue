<script setup lang="ts">
import { computed } from "vue";
import { apiBaseUrl } from "@/helpers/api.client";

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

const avatarUrl = computed(
  () => props.url || `${apiBaseUrl}/users/${props.id}/avatar`
);
</script>
<template>
  <div :class="classNames" :style="{ width: sizePx, height: sizePx }">
    <img
      :src="avatarUrl"
      alt="User Avatar"
      class="w-full h-full object-cover"
    />
  </div>
</template>

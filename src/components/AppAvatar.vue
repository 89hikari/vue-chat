<script setup lang="ts">
interface Props {
  id: number | string;
  size?: number;
}
defineProps<Props>();
</script>
<template>
  <div
    :class="[
      `rounded-full bg-gray-300 flex items-center justify-center w-${size || 16} h-${size || 16}`,
    ]"
  >
    <img
      :src="`/api/users/${id}/avatar`"
      alt="User Avatar"
      class="w-full h-full rounded-full object-cover"
    />
  </div>
</template>

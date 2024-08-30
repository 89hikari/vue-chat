<script setup lang="ts">
interface Props {
  text: string;
}
defineProps<Props>();
</script>
<template>
  <div class="text-xs text-red-400">
    {{ text }}
  </div>
</template>

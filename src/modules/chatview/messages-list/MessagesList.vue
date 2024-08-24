<script setup lang="ts">
import TheMessage from "./TheMessage.vue";

const messages = [
  {
    text: "123",
    datetime: "19:21",
    isMe: true,
  },
  {
    text: "13134 1344131 34",
    datetime: "19:22",
    isMe: false,
  },
];
</script>

<template>
  <div class="h-[calc(100%-6.5rem)] overflow-auto scrollbar-hide">
    <TheMessage
      v-for="(message, index) in messages"
      :key="index"
      :message="message"
    />
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

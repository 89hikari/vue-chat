<script setup lang="ts">
import { useCurrentChat } from "@/stores/current-chat";
import TheMessage from "./TheMessage.vue";
const currentChat = useCurrentChat();
</script>

<template>
  <div class="h-[calc(100%-6.5rem)] overflow-auto scrollbar-hide">
    <TheMessage
      v-for="message in currentChat.messages"
      :key="message.id"
      :message="message"
    />
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

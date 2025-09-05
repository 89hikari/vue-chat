<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import { useCurrentChat } from "@/stores/current-chat";
import TheMessage from "./TheMessage.vue";

const currentChat = useCurrentChat();
const scrollContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
  });
};

onMounted(() => scrollToBottom());
watch(currentChat.messages, () => scrollToBottom());
</script>

<template>
  <div
    ref="scrollContainer"
    class="h-[calc(100%-6.5rem)] overflow-auto scrollbar-hide"
  >
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

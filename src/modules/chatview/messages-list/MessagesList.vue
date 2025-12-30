<script setup lang="ts">
import TheMessage from "./TheMessage.vue";
import { nextTick, onMounted, ref, watch } from "vue";
import { useCurrentChat } from "@/stores/current-chat";

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
    class="h-full min-h-0 overflow-auto scrollbar-hide pb-4"
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

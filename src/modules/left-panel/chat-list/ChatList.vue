<script setup lang="ts">
import { useSidebarMessages } from "@/stores/sidebar-messages.store";
import TheChat from "./TheChat.vue";

const messagesStore = useSidebarMessages();
messagesStore.getMessages();
</script>

<template>
  <TheScrollbar class="pl-2 pt-2 pr-3 h-[calc(100%-3.5rem)]">
    <TheChat
      v-for="chat in messagesStore.messages"
      :key="chat.id"
      :chat="chat"
    />
  </TheScrollbar>
</template>

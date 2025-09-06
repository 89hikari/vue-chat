<script setup lang="ts">
import TheChat from "./TheChat.vue";
import { useSidebarMessages } from "@/stores/sidebar-messages.store";
import { storeToRefs } from "pinia";

const messagesStore = useSidebarMessages();
messagesStore.getMessages();

const { messages } = storeToRefs(messagesStore);
</script>

<template>
  <TheScrollbar class="pl-2 pt-2 pr-3 h-[calc(100%-3.5rem)]">
    <TheChat v-for="chat in messages" :key="chat.key" :chat="chat" />
  </TheScrollbar>
</template>

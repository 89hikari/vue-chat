<script setup lang="ts">
import TheChat from "./TheChat.vue";

const chats = [
  {
    id: 1,
    name: "Test",
    message: "asefleaf maefmkfe amkfe amekafe kmefmkioa fekioafeoik",
    datetime: "15:20",
  },
  {
    id: 2,
    name: "Test 1",
    message: "asefleaf maefmkfe  kmefmkioa fekioafeoik",
    datetime: "15:27",
  },
  {
    id: 3,
    name: "Test 4",
    message: "asefleaf amekafe kmefmkioa fekioafeoik",
    datetime: "15:22",
  },
  {
    id: 4,
    name: "Test 5",
    message: "asefleaf maefmkfe amkfe amekafe kmefmkioak",
    datetime: "15:21",
  },
  {
    id: 5,
    name: "Test 2",
    message: "asefleaf maefmkfe amkfe amekafe kmefmkioa fekioafeoik",
    datetime: "15:23",
  },
];
</script>

<template>
  <TheScrollbar class="pl-2 pt-2 pr-3 h-[calc(100%-3.5rem)]">
    <TheChat v-for="chat in chats" :key="chat.id" :chat="chat" />
  </TheScrollbar>
</template>

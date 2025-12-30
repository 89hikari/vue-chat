<script setup lang="ts">
import TheHeader from "./TheHeader.vue";
import ChatList from "./chat-list/ChatList.vue";
</script>

<template>
  <div
    class="left-column h-screen shadow-neon-purple bg-dark-card border-r border-neon-purple border-opacity-20 w-full md:w-80 lg:w-96 xl:w-[400px]"
  >
    <TheHeader />
    <ChatList />
  </div>
</template>

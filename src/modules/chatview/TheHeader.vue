<script setup lang="ts">
import AppIconButton from "@/components/AppIconButton.vue";
import { useCurrentChat } from "@/stores/current-chat";
const currentChat = useCurrentChat();
</script>

<template>
  <div class="bg-white shadow-lg px-6 py-2 flex align-center">
    <div
      style="background-color: aquamarine"
      class="rounded-full w-12 h-12 mr-3 flex-shrink-0 small relative z-0"
      :class="{ 'online-indicator': currentChat.user?.isOnline }"
    ></div>
    <div class="flex align-center justify-between flex-row w-full my-auto">
      <div class="flex-grow">
        <div class="font-semibold">{{ currentChat.user?.name }}</div>
        <div class="text-sm">last seen...</div>
      </div>
      <div class="actions">
        <AppIconButton icon="pi-ellipsis-v" />
      </div>
    </div>
  </div>
</template>

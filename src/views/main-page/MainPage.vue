<script setup lang="ts">
import LeftPanel from "@/modules/left-panel/LeftPanel.vue";
import TheChatview from "@/modules/chatview/TheChatview.vue";
import { useUserStore } from "@/stores/user.store";
import { watchEffect, provide } from "vue";
import { useWebsocketsStore } from "@/stores/websockets.store";
import { useResponsiveLayout } from "@/composables/useResponsiveLayout";

const userStore = useUserStore();
const websocketStore = useWebsocketsStore();
const layout = useResponsiveLayout();

// Provide layout control to child components
provide("layout", layout);

watchEffect(() => {
  if (userStore.user.info?.id) {
    websocketStore.connectToWebsocket();
  } else {
    userStore.identify();
  }
});
</script>

<template>
  <div class="flex h-screen overflow-hidden" v-if="userStore.user.info?.id">
    <LeftPanel v-show="layout.isListVisible.value" />
    <TheChatview v-show="layout.isChatVisible.value" />
  </div>
</template>

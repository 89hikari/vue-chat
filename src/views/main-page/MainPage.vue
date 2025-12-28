<script setup lang="ts">
import LeftPanel from "@/modules/left-panel/LeftPanel.vue";
import TheChatview from "@/modules/chatview/TheChatview.vue";
import { useUserStore } from "@/stores/user.store";
import { watchEffect } from "vue";
import { useWebsocketsStore } from "@/stores/websockets.store";

const userStore = useUserStore();
const websocketStore = useWebsocketsStore();

watchEffect(() => {
  if (userStore.user.info?.id) {
    websocketStore.connectToWebsocket();
  } else {
    userStore.identify();
  }
});
</script>

<template>
  <div class="flex" v-if="userStore.user.info?.id">
    <LeftPanel />
    <TheChatview />
  </div>
</template>

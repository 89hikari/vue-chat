<script setup lang="ts">
import LeftPanel from "@/modules/left-panel/LeftPanel.vue";
import TheChatview from "@/modules/chatview/TheChatview.vue";
import { useUserStore } from "@/stores/user.store";
import { watchEffect } from "vue";

const userStore = useUserStore();

watchEffect(() => {
  if (userStore.user.info?.id) {
    userStore.connectToWebsocket();
  } else {
    userStore.identificate();
  }
});
</script>

<template>
  <div class="flex" v-if="userStore.user.info?.id">
    <LeftPanel />
    <TheChatview />
  </div>
</template>

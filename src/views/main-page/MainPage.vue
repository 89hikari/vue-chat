<script setup lang="ts">
import LeftPanel from "@/modules/left-panel/LeftPanel.vue";
import TheChatview from "@/modules/chatview/TheChatview.vue";
import { useUserStore } from "@/stores/user.store";

const userStore = useUserStore();
!userStore.user.info?.id && userStore.identificate();
</script>

<template>
  <div class="flex" v-if="userStore.user.info?.id">
    <LeftPanel />
    <TheChatview />
  </div>
</template>

<script setup lang="ts">
import AppTransition from "@/components/AppTransition.vue";
import AppTextarea from "@/components/AppTextarea.vue";
import TheHeader from "./TheHeader.vue";
import MessagesList from "./messages-list/MessagesList.vue";
import TheEmpty from "./TheEmpty.vue";
import useChat from "@/composables/useChat";
import { useCurrentChat } from "@/stores/current-chat";
import { computed } from "vue";

useChat().watchCurrentChat();
const currentChat = useCurrentChat();

const isNotSelected = computed(
  () =>
    !currentChat.messages.length && !currentChat.user?.id && currentChat.loaded
);
const isSelectedAndLoaded = computed(
  () => currentChat.user?.id && currentChat.loaded
);
</script>

<template>
  <div class="h-screen w-8/12 flex flex-col bg-gradient-cosmic">
    <div v-if="isSelectedAndLoaded" class="flex-1 flex flex-col min-h-0">
      <TheHeader />

      <div class="flex-1 min-h-0 flex justify-center">
        <div class="w-full max-w-[560px] h-full">
          <MessagesList v-if="currentChat.messages.length" />
          <TheEmpty v-else />
        </div>
      </div>

      <div class="px-10 py-4">
        <AppTextarea
          v-model="currentChat.currentMessage"
          placeholder="Input message"
          class="mx-auto max-w-[560px]"
          @keydown.enter.exact.prevent="currentChat.sendMessage"
          @keydown.enter.shift.exact.prevent="
            currentChat.currentMessage += '\n'
          "
        />
      </div>
    </div>

    <AppTransition>
      <TheEmpty v-if="isNotSelected" />
    </AppTransition>
  </div>
</template>

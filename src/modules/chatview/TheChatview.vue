<script setup lang="ts">
import useChat from "@/composables/useChat";
import TheHeader from "./TheHeader.vue";
import MessagesList from "./messages-list/MessagesList.vue";
import TheEmpty from "./TheEmpty.vue";
import { useCurrentChat } from "@/stores/current-chat";
import AppTransition from "@/components/AppTransition.vue";
import AppTextarea from "@/components/AppTextarea.vue";
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
  <div class="h-screen w-8/12 flex flex-col">
    <AppTransition :duration="400">
      <div class="h-[calc(100%-2.5rem)]" v-if="isSelectedAndLoaded">
        <TheHeader />
        <MessagesList v-if="currentChat.messages.length" />
        <TheEmpty v-else />
        <div class="mb-8 px-10">
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
    </AppTransition>
    <AppTransition>
      <TheEmpty v-if="isNotSelected" />
    </AppTransition>
  </div>
</template>

<script setup lang="ts">
import useChat from "@/composables/useChat";
import TheHeader from "./TheHeader.vue";
import MessagesList from "./messages-list/MessagesList.vue";
import AppInput from "@/components/AppInput.vue";
import TheEmpty from "./TheEmpty.vue";
import { ref } from "vue";
import { useCurrentChat } from "@/stores/current-chat";

useChat().watchCurrentChat();

const message = ref<string>("");
const currentChat = useCurrentChat();
</script>

<template>
  <div class="h-screen w-8/12 flex flex-col">
    <TheHeader />
    <MessagesList v-if="currentChat.messages.length" />
    <TheEmpty v-else />
    <div class="mb-8 px-10">
      <AppInput
        v-model="message"
        label="Input message"
        class="bg-white rounded-[7px] mx-auto max-w-[560px]"
      />
    </div>
  </div>
</template>

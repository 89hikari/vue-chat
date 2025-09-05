<script setup lang="ts">
import useDate from "@/composables/useDate";
import { useSidebarMessages } from "@/stores/sidebar-messages.store";
import { toRefs } from "vue";

type Chat = {
  id: number;
  personId: number;
  personName: string;
  message: string;
  date: string;
  isOnline?: boolean;
};
interface Props {
  chat: Chat;
}

const sidebarMessages = useSidebarMessages();
const props = defineProps<Props>();
const { personId, personName, message, date, isOnline } = toRefs(props.chat);

const { localDate } = useDate(date.value);
</script>

<template>
  <div
    @click="sidebarMessages.setCurrentChat(personId)"
    class="p-2 flex items-center hover:bg-gray-100 cursor-pointer transition ease-in-out duration-200 rounded-lg w-full"
    :class="{
      '!bg-blue-400 !text-white': personId === sidebarMessages.currentChat,
    }"
  >
    <div
      style="background-color: aquamarine"
      class="rounded-full w-14 h-14 mr-3 flex-shrink-0"
      :class="{ 'online-indicator': isOnline }"
    ></div>
    <div class="w-[calc(100%-4.25rem)]">
      <div class="flex align-center justify-between">
        <p class="font-semibold text-base">{{ personName }}</p>
        <span class="text-xs">{{ localDate }}</span>
      </div>
      <p class="text-base font-light truncate">
        {{ message }}
      </p>
    </div>
  </div>
</template>

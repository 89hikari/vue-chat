<script setup lang="ts">
import AppAvatar from "@/components/AppAvatar.vue";
import AppAvatarPlaceholder from "@/components/AppAvatarPlaceholder.vue";
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
  hasAvatar?: boolean;
};
interface Props {
  chat: Chat;
}

const sidebarMessages = useSidebarMessages();
const props = defineProps<Props>();
const { personId, personName, message, date, isOnline, hasAvatar } = toRefs(
  props.chat
);

const { localDate } = useDate(date.value);
</script>

<template>
  <div
    @click="sidebarMessages.setCurrentChat(personId)"
    class="p-3 flex items-center hover:bg-cosmic-700 hover:shadow-neon-purple cursor-pointer transition ease-in-out duration-300 rounded-md w-full mt-2"
    :class="{
      'bg-gradient-neon shadow-neon-cyan text-white':
        personId === sidebarMessages.currentChat,
      'bg-dark-card border border-neon-purple border-opacity-20 text-neon-cyan':
        personId !== sidebarMessages.currentChat,
    }"
  >
    <AppAvatarPlaceholder
      :is-online="isOnline"
      :name="personName"
      v-if="!hasAvatar"
    />
    <AppAvatar v-else :id="personId" :size="12" class="mr-3" />

    <div class="w-[calc(100%-4.25rem)]">
      <div class="flex align-center justify-between">
        <p class="font-semibold text-base">{{ personName }}</p>
        <span class="text-xs opacity-70">{{ localDate }}</span>
      </div>
      <p class="text-sm font-light truncate opacity-80">
        {{ message }}
      </p>
    </div>
  </div>
</template>

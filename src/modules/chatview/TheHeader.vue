<script setup lang="ts">
import AppAvatarPlaceholder from "@/components/AppAvatarPlaceholder.vue";
import AppAvatar from "@/components/AppAvatar.vue";
import useDate from "@/composables/useDate";
import { useCurrentChat } from "@/stores/current-chat";
import { computed, toRef } from "vue";

const currentChat = useCurrentChat();
const user = toRef(currentChat.user);
const lastSeenAt = computed(() => {
  if (!user.value?.lastSeenAt) return "never";
  const { localDate } = useDate(user.value?.lastSeenAt);
  return localDate.value;
});
</script>

<template>
  <div class="bg-white shadow-lg px-6 py-2 flex align-center">
    <AppAvatarPlaceholder
      :is-online="user?.isOnline"
      :name="user!.name"
      v-if="!user?.hasAvatar"
    />
    <AppAvatar v-else :id="user.id" :size="12" class="mr-3" />
    <div class="flex align-center justify-between flex-row w-full my-auto">
      <div class="flex-grow">
        <div class="font-semibold">{{ user?.name }}</div>
        <div v-if="!user?.isOnline" class="text-sm">
          last seen: {{ lastSeenAt }}
        </div>
      </div>
    </div>
  </div>
</template>

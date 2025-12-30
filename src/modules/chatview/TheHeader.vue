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
  <div
    class="px-6 py-3 flex items-center gap-4 border-b border-neon-purple border-opacity-10 bg-transparent"
  >
    <div class="relative flex-shrink-0">
      <AppAvatar
        v-if="user?.hasAvatar"
        :id="user.id"
        :size="14"
        class="rounded-md"
      />
      <AppAvatarPlaceholder
        v-else
        :name="user?.name ?? ''"
        :is-online="user?.isOnline"
      />
      <span
        v-if="user?.isOnline"
        class="absolute -bottom-0 -right-0 w-3 h-3 rounded-full bg-neon-cyan ring-2 ring-dark-card animate-glow-pulse"
        aria-hidden="true"
      />
    </div>

    <div class="flex flex-col justify-center flex-1 min-w-0">
      <div class="flex items-center justify-between">
        <div class="truncate">
          <div class="text-lg font-semibold text-white truncate">
            {{ user?.name }}
          </div>
          <div class="text-xs text-neon-cyan opacity-80 truncate">
            <span v-if="user?.isOnline">Online</span>
            <span v-else>last seen: {{ lastSeenAt }}</span>
          </div>
        </div>

        <div class="flex items-center gap-3 ml-4">
          <button
            class="text-neon-cyan hover:text-neon-purple transition-colors"
            aria-label="Profile"
          >
            •••
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppAvatarPlaceholder from "@/components/AppAvatarPlaceholder.vue";
import AppAvatar from "@/components/AppAvatar.vue";
import useDate from "@/composables/useDate";
import { useCurrentChat } from "@/stores/current-chat";
import { computed, toRef, inject } from "vue";
import type { useResponsiveLayout } from "@/composables/useResponsiveLayout";

const currentChat = useCurrentChat();
const user = toRef(currentChat.user);
const layout = inject<ReturnType<typeof useResponsiveLayout>>("layout");

const lastSeenAt = computed(() => {
  if (!user.value?.lastSeenAt) return "never";
  const { localDate } = useDate(user.value?.lastSeenAt);
  return localDate.value;
});

const goBack = () => {
  layout?.showList();
};
</script>

<template>
  <div
    class="px-3 sm:px-4 md:px-6 py-3 flex items-center gap-2 sm:gap-4 border-b border-neon-purple border-opacity-10 bg-transparent"
  >
    <!-- Back button for mobile -->
    <button
      v-if="layout?.isMobile.value"
      @click="goBack"
      class="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full text-neon-cyan hover:bg-neon-cyan/10 transition-colors md:hidden"
      aria-label="Back to chats"
    >
      <i class="pi pi-arrow-left text-lg"></i>
    </button>

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
    </div>

    <div class="flex flex-col justify-center flex-1 min-w-0">
      <div class="flex items-center justify-between">
        <div class="truncate">
          <div class="text-base sm:text-lg font-semibold text-white truncate">
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

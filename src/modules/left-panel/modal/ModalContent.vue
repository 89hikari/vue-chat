<script setup lang="ts">
import ModalAvatarLoad from "./ModalAvatarLoad.vue";
import { useUserStore } from "@/stores/user.store";
import useDate from "@/composables/useDate";
import { computed } from "vue";

const emit = defineEmits(["close"] as const);

const userStore = useUserStore();
const user = userStore.user.info;
const lastSeen = computed(() => {
  if (!user?.lastSeenAt) return "never";
  return useDate(user.lastSeenAt).localDate.value;
});

const handleLogout = () => {
  userStore.logout();
  emit("close");
};
</script>

<template>
  <div
    class="relative rounded-xl overflow-hidden shadow-neon-glow bg-dark-card w-full"
  >
    <div
      class="px-6 py-4 bg-gradient-to-r from-cosmic-900/20 via-neon-purple/30 to-cosmic-900/10"
    >
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-white">Menu</h3>
        <button
          @click="$emit('close')"
          class="text-neon-cyan hover:text-neon-purple"
        >
          ✕
        </button>
      </div>
    </div>

    <div class="px-6 py-6 flex items-center gap-4">
      <div class="flex-shrink-0">
        <div
          class="w-16 h-16 rounded-full overflow-hidden ring-2 ring-neon-cyan/30"
        >
          <img
            v-if="user?.hasAvatar"
            :src="`/vue-chat/api/users/${user?.id}/avatar`"
            alt="avatar"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full bg-gradient-neon"></div>
        </div>
      </div>

      <div class="flex-1 min-w-0">
        <div class="text-white font-semibold truncate">{{ user?.name }}</div>
        <div class="text-sm text-neon-cyan opacity-80">
          Last seen: {{ lastSeen }}
        </div>
      </div>
    </div>

    <div class="px-6 pb-6">
      <ModalAvatarLoad />

      <div class="mt-6 flex justify-end">
        <button
          @click="handleLogout"
          class="px-4 py-2 rounded-md border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

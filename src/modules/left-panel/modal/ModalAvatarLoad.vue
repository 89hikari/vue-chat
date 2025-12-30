<script setup lang="ts">
import AppFileUpload from "@/components/AppFileUpload.vue";
import { useUserStore } from "@/stores/user.store";
import { apiBaseUrl } from "@/helpers/api.client";
import { computed, ref, watch } from "vue";

const user = useUserStore();
const avatarFile = ref<File | null>(null);
const maxBytes = 1024 * 1024; // 1 MB
const isTooLarge = ref(false);
const version = ref(Date.now());

const existingAvatar = computed(
  () => `${apiBaseUrl}/users/${user.user.info?.id}/avatar?v=${version.value}`
);

watch(avatarFile, async () => {
  if (!avatarFile.value) return;
  if (avatarFile.value.size > maxBytes) {
    isTooLarge.value = true;
    return;
  }

  isTooLarge.value = false;
  const formData = new FormData();
  formData.append("file", avatarFile.value);
  await user.uploadAvatar(formData);
});
</script>

<template>
  <div>
    <AppFileUpload
      v-model="avatarFile"
      button-name="Upload new avatar"
      :placeholder="user.user.info?.hasAvatar"
      :name="user.user.info?.name"
      :initial-url="existingAvatar"
      :size="16"
    />
    <p class="text-red-500" v-if="isTooLarge">
      File is too large. Files below 1mb accepted.
    </p>
  </div>
</template>

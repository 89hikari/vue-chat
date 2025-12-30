<script setup lang="ts">
import AppInput from "@/components/AppInput.vue";
import AppIconButton from "@/components/AppIconButton.vue";
import AppModal from "@/components/AppModal.vue";
import ModalContent from "./modal/ModalContent.vue";
import { ref } from "vue";
import { useSidebarMessages } from "@/stores/sidebar-messages.store";
import type { IUserListItem } from "@/models/IUser";

const search = ref<string>("");
const modal = ref<InstanceType<typeof AppModal>>();

const onMenuClick = () => modal.value?.toggle();
const closeModal = () => modal.value?.toggle();

const sidebarMessages = useSidebarMessages();
const setChat = (item: unknown) =>
  sidebarMessages.setCurrentChat((item as IUserListItem).id);
</script>

<template>
  <div class="px-2 sm:px-3 py-2 flex items-center z-100">
    <AppIconButton icon="pi-align-justify" class="mr-2" @click="onMenuClick" />
    <AppInput
      v-model="search"
      label="Search user"
      :fetch-results="(q) => sidebarMessages.getUsers(q)"
      @select="(elem) => setChat(elem)"
    />
    <AppModal ref="modal">
      <ModalContent @close="closeModal" />
    </AppModal>
  </div>
</template>

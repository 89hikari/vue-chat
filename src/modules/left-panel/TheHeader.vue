<script setup lang="ts">
import { ref } from "vue";
import AppInput from "@/components/AppInput.vue";
import AppIconButton from "@/components/AppIconButton.vue";
import AppModal from "@/components/AppModal.vue";
import ModalContent from "./ModalContent.vue";

const search = ref<string>("");
const modal = ref<InstanceType<typeof AppModal>>();

const onMenuClick = () => modal.value?.toggle();
</script>

<template>
  <div class="px-3 py-2 flex items-center z-100">
    <AppIconButton icon="pi-align-justify" class="mr-2" @click="onMenuClick" />
    <AppInput v-model="search" />
    <AppModal ref="modal">
      <ModalContent />
    </AppModal>
  </div>
</template>

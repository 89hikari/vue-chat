<script setup lang="ts">
import { ref } from "vue";
import AppInput from "@/components/AppInput.vue";
import AppIconButton from "@/components/AppIconButton.vue";
import { useUserStore } from "@/stores/user.store";
import AppDropdownMenu from "@/components/AppDropdownMenu.vue";

const search = ref<string>("");
const user = useUserStore();
const buttonId = "dropdownToggler";
const actions = [
  {
    text: "Logout",
    action: user.logout,
  },
];
</script>

<template>
  <div class="px-3 py-2 flex items-center">
    <AppIconButton
      icon="pi-align-justify"
      class="mr-2"
      :data-dropdown-toggle="buttonId"
      id="123"
      type="button"
    />
    <AppDropdownMenu :id="buttonId" :list="actions" />
    <AppInput v-model="search" />
  </div>
</template>

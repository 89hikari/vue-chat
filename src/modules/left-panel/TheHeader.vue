<script setup lang="ts">
import { ref } from "vue";
import AppInput from "@/components/AppInput.vue";
import AppIconButton from "@/components/AppIconButton.vue";

const search = ref<string>("");
</script>

<template>
  <div class="px-3 py-2 flex items-center">
    <AppIconButton type="pi-align-justify" class="mr-2" />
    <AppInput v-model="search" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppSearch from "@/components/AppSearch.vue";
import TheButton from "./TheButton.vue";
import ChatList from "./chat-list/ChatList.vue";

const search = ref<string>("");
</script>

<template>
  <div class="px-3 py-2 flex items-center">
    <TheButton />
    <AppSearch v-model="search" />
  </div>
  <ChatList />
</template>

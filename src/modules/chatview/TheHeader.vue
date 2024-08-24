<script setup lang="ts">
import AppIconButton from "@/components/AppIconButton.vue";
</script>

<template>
  <div class="bg-white shadow-lg px-6 py-2 flex align-center">
    <div
      style="background-color: aquamarine"
      class="rounded-full w-12 h-12 mr-3 flex-shrink-0 online-indicator small"
    ></div>
    <div class="flex align-center justify-between flex-row w-full my-auto">
      <div class="flex-grow">
        <div class="font-semibold">Name</div>
        <div class="text-sm">last seen...</div>
      </div>
      <div class="actions">
        <AppIconButton type="pi-ellipsis-v" />
      </div>
    </div>
  </div>
</template>

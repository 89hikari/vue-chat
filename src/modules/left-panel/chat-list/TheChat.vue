<script setup lang="ts">
type Chat = {
  id: number | string;
  name: string;
  message: string;
  datetime: string;
};
interface Props {
  chat: Chat;
}
defineProps<Props>();
</script>

<template>
  <div
    class="p-2 flex items-center hover:bg-gray-100 cursor-pointer transition ease-in-out duration-200 rounded-lg w-full"
    :class="{ '!bg-blue-400 !text-white': +chat.id % 2 === 0 }"
  >
    <div
      style="background-color: aquamarine"
      class="rounded-full w-14 h-14 mr-3 flex-shrink-0"
    ></div>
    <div class="w-[calc(100%-4.25rem)]">
      <div class="flex align-center justify-between">
        <p class="font-semibold text-base">{{ chat.name }}</p>
        <span class="text-xs">{{ chat.datetime }}</span>
      </div>
      <p class="text-base font-light truncate">
        {{ chat.message }}
      </p>
    </div>
  </div>
</template>

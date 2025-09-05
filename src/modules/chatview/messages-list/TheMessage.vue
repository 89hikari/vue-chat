<script setup lang="ts">
import useDate from "@/composables/useDate";
import type { IMessage } from "@/models/IMessage";
import { computed, toRefs } from "vue";

interface Props {
  message: IMessage;
}

const props = defineProps<Props>();
const { message, createdAt, isMe } = toRefs(props.message);

const { localDate } = useDate(createdAt.value);

const classes = computed(() =>
  isMe.value
    ? "bg-amber-200 rounded-bl-2xl ml-auto"
    : "bg-orange-200 rounded-br-2xl"
);
</script>

<template>
  <div class="mx-auto max-w-screen-sm px-10 mt-5 pb-10">
    <div
      class="max-w-[400px] p-3 pb-5 rounded-tl-2xl rounded-tr-2xl relative"
      :class="classes"
    >
      <p class="whitespace-pre-line">{{ message }}</p>
      <span class="text-xs absolute right-3 text-gray-500">{{
        localDate
      }}</span>
    </div>
  </div>
</template>

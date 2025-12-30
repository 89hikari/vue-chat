<script setup lang="ts">
import useDate from "@/composables/useDate";
import type { IMessage } from "@/models/IMessage";
import { computed } from "vue";

interface Props {
  message: IMessage;
}

const props = defineProps<Props>();

const messageText = computed(() => props.message?.message ?? "");

const localDate = computed(() => {
  const rawDate =
    props.message?.createdAt ??
    (props.message && "date" in props.message
      ? (props.message as { date?: string | Date }).date
      : undefined);

  if (!rawDate) return "";

  const formatted = useDate(rawDate).localDate.value;
  if (formatted) return formatted;

  // Fallback: show raw value if formatter cannot parse
  return String(rawDate);
});

const classes = computed(() => {
  if (!props.message) return "";
  if (props.message.isMe) {
    return "bg-gradient-neon shadow-neon-pink text-white rounded-tl-md rounded-tr-md rounded-bl-md max-w-[420px] w-full";
  }
  return "bg-dark-card border border-neon-cyan border-opacity-30 shadow-neon-cyan text-neon-cyan rounded-tl-md rounded-tr-md rounded-br-md max-w-[420px] w-full";
});
</script>

<template>
  <div class="w-full px-6 mt-6 pb-2 animate-slide-in-up">
    <div
      class="w-full flex"
      :class="props.message?.isMe ? 'justify-end' : 'justify-start'"
    >
      <div
        class="p-3 pb-2 relative transition-all duration-300 hover:shadow-lg"
        :class="classes"
      >
        <p class="whitespace-pre-line text-sm">{{ messageText }}</p>
        <span class="text-xs absolute right-3 bottom-1 opacity-70">{{
          localDate
        }}</span>
      </div>
    </div>
  </div>
</template>

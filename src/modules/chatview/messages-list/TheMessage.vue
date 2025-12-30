<script setup lang="ts">
import useDate from "@/composables/useDate";
import type { IMessage } from "@/models/IMessage";
import { computed, nextTick, ref, watch } from "vue";

interface Props {
  message: IMessage;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (
    e: "update-message",
    payload: { id: number | string; message: string }
  ): void;
}>();

const messageText = computed(() => props.message?.message ?? "");

const isEditing = ref(false);
const draft = ref("");
const editInput = ref<HTMLTextAreaElement | null>(null);

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

const startEdit = () => {
  if (!props.message?.isMe) return;
  draft.value = messageText.value;
  isEditing.value = true;
  nextTick(() => editInput.value?.focus());
};

const cancelEdit = () => {
  isEditing.value = false;
  draft.value = messageText.value;
};

const saveEdit = () => {
  if (!props.message?.isMe) return;
  const trimmed = draft.value.trim();
  if (!trimmed || trimmed === messageText.value.trim()) {
    cancelEdit();
    return;
  }
  emit("update-message", { id: props.message.id, message: trimmed });
  isEditing.value = false;
};

watch(
  () => props.message?.message,
  (val) => {
    if (!isEditing.value) draft.value = val ?? "";
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="w-full px-3 sm:px-4 md:px-6 mt-4 md:mt-6 pb-2 animate-slide-in-up"
  >
    <div
      class="w-full flex"
      :class="props.message?.isMe ? 'justify-end' : 'justify-start'"
    >
      <div
        class="p-2.5 sm:p-3 pb-2 relative transition-all duration-300 hover:shadow-lg"
        :class="classes"
      >
        <div
          v-if="props.message?.isMe && !isEditing"
          class="absolute right-2 top-2 flex gap-2 text-xs opacity-80"
        >
          <button
            type="button"
            class="hover:opacity-100 focus:outline-none"
            @click="startEdit"
          >
            Edit
          </button>
        </div>

        <template v-if="isEditing">
          <textarea
            ref="editInput"
            v-model="draft"
            class="w-full rounded-md bg-white/10 border border-white/20 text-sm text-white p-2 resize-none focus:outline-none focus:ring-2 focus:ring-neon-cyan"
            rows="3"
            @keydown.enter.exact.prevent="saveEdit"
            @keydown.esc="cancelEdit"
          ></textarea>
          <div class="flex justify-end gap-2 mt-2 text-xs">
            <button
              type="button"
              class="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white"
              @click="saveEdit"
            >
              Save
            </button>
            <button
              type="button"
              class="px-3 py-1 rounded bg-white/5 hover:bg-white/10 text-white"
              @click="cancelEdit"
            >
              Cancel
            </button>
          </div>
        </template>

        <template v-else>
          <p class="whitespace-pre-line text-sm">{{ messageText }}</p>
          <span
            class="text-xs absolute right-2 sm:right-3 bottom-1 opacity-70"
            >{{ localDate }}</span
          >
        </template>
      </div>
    </div>
  </div>
</template>

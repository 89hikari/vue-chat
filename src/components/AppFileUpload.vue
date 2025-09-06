<script setup lang="ts">
import AppAvatar from "./AppAvatar.vue";
import AppAvatarPlaceholder from "./AppAvatarPlaceholder.vue";
import { ref, watch } from "vue";

const modelValue = defineModel<File | null>({ default: null });

const props = defineProps<{
  buttonName?: string;
  size?: number;
  initialUrl?: string;
  placeholder?: boolean;
  name?: string;
}>();

const preview = ref<string | null>(props.initialUrl || null);

watch(modelValue, (file) => {
  if (!file) {
    preview.value = props.initialUrl || null;
    return;
  }

  const reader = new FileReader();
  reader.onload = () => (preview.value = reader.result as string);
  reader.readAsDataURL(file);
});

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files || !target.files[0]) return;

  modelValue.value = target.files[0];
}
</script>

<template>
  <div class="flex items-center space-y-2">
    <AppAvatar v-if="placeholder" :url="preview" :size="12" class="mr-3" />
    <AppAvatarPlaceholder v-else :name="name || ''" />
    <label
      class="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 ml-3"
    >
      {{ buttonName || "Upload new file" }}
      <input
        type="file"
        class="hidden"
        @change="handleFileChange"
        accept="image/*"
      />
    </label>
  </div>
</template>

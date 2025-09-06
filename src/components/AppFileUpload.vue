<script setup lang="ts">
import { ref, watch } from "vue";
import AppAvatarPlaceholder from "./AppAvatarPlaceholder.vue";

const modelValue = defineModel<File | null>({ default: null });

const props = defineProps<{
  size?: number;
  initialUrl?: string;
  placeholder?: boolean;
  name?: string;
}>();

const preview = ref<string | null>(props.initialUrl || null);
const sizeClass = `w-${props.size || 24} h-${props.size || 24}`;

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
    <div class="relative" v-if="placeholder">
      <img
        v-if="preview"
        :src="preview"
        :class="['rounded-full object-cover', sizeClass]"
        alt="Avatar"
      />
      <div
        v-else
        :class="[
          'rounded-full bg-gray-300 flex items-center justify-center text-white',
          sizeClass,
        ]"
      >
        <i class="fas fa-user"></i>
      </div>
    </div>
    <AppAvatarPlaceholder v-else :name="name || ''" />
    <label
      class="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 ml-3"
    >
      Upload new file
      <input
        type="file"
        class="hidden"
        @change="handleFileChange"
        accept="image/*"
      />
    </label>
  </div>
</template>

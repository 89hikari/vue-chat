<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import type { IInput } from "@/models/IInput";

const modelValue = defineModel<string>({ default: "", type: String });
const props = defineProps<IInput>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "select", item: unknown): void;
}>();

// shown label/placeholder refs removed — using props directly
const results = ref<unknown[]>([]);
const listOpen = ref(false);
const loading = ref(false);

let debounceTimer: number | undefined;

const clearTimer = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = undefined;
  }
};

const handleFocus = () => {
  if (results.value.length) {
    listOpen.value = true;
  }
};

const getItemLabel = (item: unknown) => {
  if (item && typeof item === "object") {
    const obj = item as Record<string, unknown>;
    return obj.label ?? obj.name ?? obj.id ?? "";
  }
  return String(item ?? "");
};

watch(modelValue, (q) => {
  clearTimer();
  if (!q) {
    listOpen.value = false;
    return;
  }
  debounceTimer = window.setTimeout(async () => {
    loading.value = true;
    try {
      if (props.fetchResults) results.value = await props.fetchResults(q);
      listOpen.value = true;
    } catch (e) {
      console.error(e);
      results.value = [];
      listOpen.value = false;
    } finally {
      loading.value = false;
    }
  }, props.debounceMs ?? 400);
});

const clear = () => {
  emit("update:modelValue", "");
  results.value = [];
  listOpen.value = false;
};

const selectItem = (item: unknown) => {
  emit("select", item);
  emit("update:modelValue", "");
  listOpen.value = false;
};

const wrapperRef = ref<HTMLElement | null>(null);
const handleClickOutside = (e: MouseEvent) => {
  if (!wrapperRef.value?.contains(e.target as Node)) {
    listOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  clearTimer();
});
</script>

<template>
  <div class="relative h-12 w-full" ref="wrapperRef">
    <!-- Input field -->
    <input
      v-model="modelValue"
      :placeholder="props.placeholder || ''"
      :type="props.type || 'text'"
      class="w-full h-full rounded-md border border-neon-cyan border-opacity-30 bg-dark-card px-4 py-3 pr-10 font-sans text-sm font-normal text-white outline-none transition-all duration-300 placeholder:text-neon-cyan placeholder:opacity-50 focus:border-opacity-100 focus:shadow-neon-cyan hover:border-opacity-50"
      @focus="handleFocus"
    />

    <!-- Right icon/button -->
    <div
      class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2"
    >
      <span
        v-if="loading"
        class="w-4 h-4 border-2 border-neon-cyan border-opacity-50 border-t-neon-cyan rounded-full animate-spin"
      ></span>
      <button
        v-else-if="modelValue"
        @click.prevent="clear"
        class="w-8 h-8 flex items-center justify-center bg-transparent border border-neon-cyan border-opacity-40 text-neon-cyan hover:bg-neon-cyan/20 hover:text-white rounded-full transition-colors duration-150"
        aria-label="Clear"
        title="Clear"
      >
        <span class="text-lg font-semibold leading-none">×</span>
      </button>
    </div>

    <!-- Dropdown results -->
    <ul
      v-if="listOpen && results.length"
      class="absolute left-0 right-0 top-full mt-2 bg-dark-card border border-neon-purple border-opacity-30 rounded-md shadow-neon-purple max-h-60 overflow-auto z-10"
    >
      <li
        v-for="(item, i) in results"
        :key="i"
        class="px-4 py-2 hover:bg-cosmic-700 hover:text-neon-cyan cursor-pointer transition-colors duration-200 text-neon-cyan"
        @mousedown.prevent="selectItem(item)"
      >
        {{ getItemLabel(item) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import type { IInput } from "@/models/IInput";

const modelValue = defineModel<string>({ default: "", type: String });
const props = defineProps<IInput>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "select", item: unknown): void;
}>();

const showedLabel = ref(props.label || "Search");
const showedPlaceholder = ref<string>("");
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
  showedPlaceholder.value = props.placeholder || "";
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
      results.value = await props.fetchResults(q);
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
  <div class="relative h-10 w-full" ref="wrapperRef">
    <div
      class="absolute top-2/4 right-3 grid h-5 w-5 -translate-y-2/4 place-items-center text-blue-gray-500"
    >
      <span
        v-if="loading"
        class="w-4 h-4 border-2 border-gray-300 border-t-sky-500 rounded-full animate-spin"
      ></span>
      <button
        v-else-if="modelValue"
        @click.prevent="clear"
        class="text-gray-500 hover:text-gray-700"
      >
        ×
      </button>
      <i v-else class="fas fa-heart" aria-hidden="true"></i>
    </div>

    <input
      v-model="modelValue"
      class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-sky-200 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      :placeholder="showedPlaceholder"
      @focus="handleFocus"
      @blur="showedPlaceholder = ''"
      :type="props.type"
    />

    <label
      class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-sky-200 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-sky-200 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
    >
      {{ showedLabel }}
    </label>

    <ul
      v-if="listOpen && results.length"
      class="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto z-10"
    >
      <li
        v-for="(item, i) in results"
        :key="i"
        class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
        @mousedown.prevent="selectItem(item)"
      >
        {{ getItemLabel(item) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type ListElepent = {
  text: string;
  action: () => void;
};
interface Props {
  id: string;
  list: ListElepent[];
}
defineProps<Props>();
</script>
<template>
  <div
    :id="id"
    class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
  >
    <ul
      class="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownDefaultButton"
    >
      <li v-for="(listElem, _) in list" :key="_">
        <button
          @click.stop="listElem.action()"
          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          {{ listElem.text }}
        </button>
      </li>
    </ul>
  </div>
</template>

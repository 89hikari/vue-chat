<script setup lang="ts">
import { stringToGradient } from "@/helpers/styles.helper";
import { computed } from "vue";
interface Props {
  name: string;
  isOnline?: boolean;
}
const props = defineProps<Props>();

const nameShown = computed(() =>
  props.name
    .split(" ")
    .map((el) => `${el[0].toUpperCase()}`)
    .slice(0, 1)
    .join(".")
);
</script>

<template>
  <div
    :style="{ background: stringToGradient(name) }"
    class="rounded-full w-12 h-12 mr-3 flex-shrink-0 small relative z-0"
    :class="{ online: isOnline }"
  >
    <p class="text-2xl text-center mt-2">{{ nameShown }}</p>
  </div>
</template>

<style scoped lang="scss">
.online {
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #31e620;
    bottom: 0;
    right: 0;
  }
  &.small::before {
    width: 10px;
    height: 10px;
  }
}
</style>

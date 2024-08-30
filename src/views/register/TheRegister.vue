<script setup lang="ts">
import TheRegister from "@/modules/register/TheRegister.vue";
import router from "@/router";
import { useRegistrationStore } from "@/stores/registration.store";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const store = useRegistrationStore();
const route = useRoute();

onMounted(async () => {
  const identificator = route.params.identificator;
  if (identificator) {
    identificator &&
      (await store.checkVerification(identificator.toString())) &&
      router.push("/auth");

    return;
  }

  store.toggleLoading();
});
</script>

<template>
  <TheRegister v-if="store.loaded" />
</template>

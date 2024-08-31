<script setup lang="ts">
import TheRegister from "@/modules/register/TheRegister.vue";
import router from "@/router";
import { useRegistrationStore } from "@/stores/registration.store";
import { useUserStore } from "@/stores/user.store";
import { onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const store = useRegistrationStore();
const { user } = useUserStore();
const route = useRoute();

onMounted(async () => {
  if (user.token) return;
  const identificator = route.params.identificator?.toString();
  if (identificator) {
    store.nameOrEmailToVerify = identificator;
    identificator &&
      (await store.checkVerification(identificator)) &&
      router.push("/auth");
  }

  store.loaded = true;
});
onUnmounted(() => (store.loaded = false));
</script>

<template>
  <TheRegister v-if="store.loaded" />
</template>

<script setup lang="ts">
import AppInput from "@/components/AppInput.vue";
import AppFormSubmitButton from "@/components/AppFormSubmitButton.vue";
import AppErrorMessageString from "@/components/AppErrorMessageString.vue";
import { ref } from "vue";
import type { ICommonForm } from "@/models/IForm";
import { useRegistrationStore } from "@/stores/registration.store";

const store = useRegistrationStore();
const errorMessage = ref<string>();
const formRef = ref<ICommonForm>({
  verificationCode: {
    value: "",
    placeholder: "Type here",
    label: "Verification code",
  },
});

const submit = async () =>
  (errorMessage.value = (
    await store.verify(formRef.value.verificationCode.value)
  )?.toString());
</script>

<template>
  <AppErrorMessageString
    v-if="errorMessage"
    :text="errorMessage"
    class="mb-8"
  />
  <div
    class="mb-5 w-full max-w-[400px]"
    v-for="(form, key) in formRef"
    :key="key"
  >
    <AppInput
      :placeholder="form.placeholder"
      :label="form.label"
      v-model="form.value"
      class="mb-1"
      @update:model-value="errorMessage = ''"
    />
  </div>
  <AppFormSubmitButton @submit="submit" />
</template>

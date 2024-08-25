<script setup lang="ts">
import { ref } from "vue";
import AppInput from "@/components/AppInput.vue";
import AppFormSubmitButton from "@/components/AppFormSubmitButton.vue";
import type { ICommonForm } from "@/models/IForm";

const incorrectPassword = ref<boolean>(false);

const formRef = ref<ICommonForm>({
  username: {
    value: "",
    placeholder: "Type here",
    label: "Username or e-mail",
  },
  email: {
    value: "",
    placeholder: "Type here",
    label: "Password",
    type: "password",
  },
});

const submit = async () => {
  incorrectPassword.value = !incorrectPassword.value;
};
</script>

<template>
  <div
    class="mb-3 w-full max-w-[400px]"
    v-for="(form, key) in formRef"
    :key="key"
  >
    <AppInput
      :placeholder="form.placeholder"
      :label="form.label"
      :type="form?.type"
      v-model="form.value"
      class="mb-1"
    />
  </div>
  <div v-if="incorrectPassword" class="text-xs text-red-400 mb-5">
    No account matches your combination
  </div>
  <AppFormSubmitButton @submit="submit" />
</template>

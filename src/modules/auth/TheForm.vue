<script setup lang="ts">
import AppInput from "@/components/AppInput.vue";
import AppFormSubmitButton from "@/components/AppFormSubmitButton.vue";
import AppErrorMessageString from "@/components/AppErrorMessageString.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import type { ICommonForm } from "@/models/IForm";

const errorMessage = ref<string>();
const userStore = useUserStore();

const formRef = ref<ICommonForm>({
  username: {
    value: "",
    placeholder: "Type here",
    label: "Username or e-mail",
  },
  password: {
    value: "",
    placeholder: "Type here",
    label: "Password",
    type: "password",
  },
});

const submit = async () => {
  const loginAttempt = await userStore.login(
    formRef.value.username.value,
    formRef.value.password.value
  );

  typeof loginAttempt === "string" && (errorMessage.value = loginAttempt);
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
      @update:model-value="errorMessage = ''"
      @keyup.enter="form?.type === 'password' && submit()"
    />
  </div>
  <AppErrorMessageString
    v-if="errorMessage"
    :text="errorMessage"
    class="mb-5"
  />
  <AppFormSubmitButton @submit="submit" />
</template>

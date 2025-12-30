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
    placeholder: "Enter your username or email",
    label: "Username or e-mail",
  },
  password: {
    value: "",
    placeholder: "Enter your password",
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
  <div class="w-full max-w-[400px] space-y-6">
    <div class="mb-4 w-full" v-for="(form, key) in formRef" :key="key">
      <AppInput
        :placeholder="form.placeholder"
        :label="form.label"
        :type="form?.type"
        v-model="form.value"
        class="mb-2 transition-glow duration-300"
        @update:model-value="errorMessage = ''"
        @keyup.enter="form?.type === 'password' && submit()"
      />
    </div>
    <AppErrorMessageString
      v-if="errorMessage"
      :text="errorMessage"
      class="mb-5 text-neon-pink animate-fade-in"
    />
    <AppFormSubmitButton @submit="submit" />
  </div>
</template>

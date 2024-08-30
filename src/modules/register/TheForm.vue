<script setup lang="ts">
import { ref } from "vue";
import AppErrorMessageString from "@/components/AppErrorMessageString.vue";
import AppInput from "@/components/AppInput.vue";
import AppFormSubmitButton from "@/components/AppFormSubmitButton.vue";
import useValidation from "@/composables/useValidation";
import {
  emailValidator,
  passwordConfirmationValidator,
  passwordValidator,
  usernameValidator,
} from "@/helpers/valudators.helpers";
import type { ICommonForm } from "@/models/IForm";
import { useRegistrationStore } from "@/stores/registration.store";

const store = useRegistrationStore();
const errorMessage = ref<string>();
const formRef = ref<ICommonForm>({
  username: {
    value: "",
    placeholder: "Type here",
    label: "Username",
    validation: usernameValidator,
  },
  email: {
    value: "",
    placeholder: "example@ex.le",
    label: "E-Mail",
    validation: emailValidator,
  },
  password: {
    value: "",
    placeholder: "Type here",
    label: "Password",
    type: "password",
    validation: passwordValidator,
  },
  passwordConfirmation: {
    value: "",
    placeholder: "Type here",
    label: "Confirm password",
    type: "password",
    validation: passwordConfirmationValidator,
  },
});

const { validate, isValid, getError } = useValidation(formRef.value, {
  mode: "lazy",
});

const submit = async () => {
  await validate();
  if (isValid.value) {
    const signupAttempt = await store.signup(
      formRef.value.username.value,
      formRef.value.email.value,
      formRef.value.password.value,
      "male"
    );

    typeof signupAttempt === "string" && (errorMessage.value = signupAttempt);
  }
};
</script>

<template>
  <AppErrorMessageString
    v-if="errorMessage"
    :text="errorMessage"
    class="mb-5"
  />
  <div
    class="mb-5 w-full max-w-[400px]"
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
    />
    <div class="text-xs text-red-400">{{ getError(key.toString()) }}</div>
  </div>
  <AppFormSubmitButton @submit="submit" />
</template>

<script setup lang="ts">
import { ref } from "vue";
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
import axios from "axios";

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
    const response = await axios.post("/api/auth/signup", {
      name: formRef.value.username.value,
      email: formRef.value.email.value,
      password: formRef.value.password.value,
      gender: "male",
    });
    if (response.status === 201) {
      console.log("created");
    }
  }
};
</script>

<template>
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
    />
    <div class="text-xs text-red-400">{{ getError(key.toString()) }}</div>
  </div>
  <AppFormSubmitButton @submit="submit" />
</template>

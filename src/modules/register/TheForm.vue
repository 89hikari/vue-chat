<script setup lang="ts">
import AppErrorMessageString from "@/components/AppErrorMessageString.vue";
import AppInput from "@/components/AppInput.vue";
import AppFormSubmitButton from "@/components/AppFormSubmitButton.vue";
import TheVerify from "./TheVerify.vue";
import useValidation from "@/composables/useValidation";
import {
  emailValidator,
  passwordConfirmationValidator,
  passwordValidator,
  usernameValidator,
} from "@/helpers/validators.helpers";
import type { ICommonForm } from "@/models/IForm";
import { useRegistrationStore } from "@/stores/registration.store";
import { ref } from "vue";

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
    errorMessage.value = (
      await store.signup(
        formRef.value.username.value,
        formRef.value.email.value,
        formRef.value.password.value,
        "male"
      )
    )?.toString();
  }
};
</script>

<template>
  <TheVerify v-if="store.nameOrEmailToVerify" />
  <template v-else>
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
        :type="form?.type"
        v-model="form.value"
        class="mb-1"
        @update:model-value="errorMessage = ''"
      />
      <div class="text-xs text-red-400">{{ getError(key.toString()) }}</div>
    </div>
    <AppFormSubmitButton @submit="submit" />
  </template>
</template>

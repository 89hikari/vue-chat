<script setup lang="ts">
import { ref } from "vue";
import AppInput from "@/components/AppInput.vue";
import useValidation from "@/composables/useValidation";
import {
  emailValidator,
  passwordConfirmationValidator,
  passwordValidator,
  usernameValidator,
} from "@/helpers/valudators.helpers";
import type { ICommonForm } from "@/models/validation/IForm";

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
    console.log("do smth");
  }
};
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div
      class="flex items-center flex-col w-full max-w-[500px] bg-white rounded-lg shadow-2xl p-6 mx-5"
    >
      <h3 class="text-xl font-semibold mb-5 flex-grow-0">Registration</h3>
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
      <button
        class="relative inline-flex 2 items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        @click="submit"
      >
        <span
          class="relative px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
        >
          Submit
        </span>
      </button>
    </div>
  </div>
</template>

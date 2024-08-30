import { ref } from "vue";
import { defineStore } from "pinia";
import type { AxiosError } from "axios";
import { get, post } from "@/helpers/api.helpers";
import router from "@/router";

export const useRegistrationStore = defineStore("registration", () => {
  const loaded = ref<boolean>(false);

  const signup = async (
    name: string,
    email: string,
    password: string,
    gender: string
  ) => {
    return await post("auth", "signup", { name, email, password, gender })
      .then(() => router.push(`/validation/${name}`))
      .catch((error: AxiosError) => {
        switch (error.status) {
          case 409:
            return "This login or email is already taken";
          default:
            console.error(error);
            return;
        }
      });
  };

  const checkVerification = async (name: string) => {
    const response = await get("auth", "check-verification", { name });
    return response.data;
  };

  const toggleLoading = () => (loaded.value = !loaded.value);

  return { loaded, checkVerification, signup, toggleLoading };
});

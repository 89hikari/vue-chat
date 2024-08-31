import { ref } from "vue";
import { defineStore } from "pinia";
import type { AxiosError } from "axios";
import { get, post } from "@/helpers/api.helpers";
import router from "@/router";

export const useRegistrationStore = defineStore("registration", () => {
  const loaded = ref<boolean>(false);
  const nameOrEmailToVerify = ref<string>("");

  const signup = async (
    name: string,
    email: string,
    password: string,
    gender: string
  ) => {
    return await post("auth", "signup", { name, email, password, gender })
      .then(() => router.push(`/register/${name}`))
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

  const checkVerification = async (name: string) =>
    (await get("auth", "check-verification", { name })).data;

  const verify = async (vfCode: string) => {
    return await post("auth", "verify", {
      name: nameOrEmailToVerify.value,
      vfCode,
    })
      .then((response) => console.log(response))
      .catch((error: AxiosError) => {
        switch (error.status) {
          case 403:
            return "Invalid code";
          case 404:
            return "User not found";
          default:
            console.error(error);
            return;
        }
      });
  };

  return { loaded, checkVerification, signup, verify, nameOrEmailToVerify };
});

import { ref } from "vue";
import { defineStore } from "pinia";
import type { AxiosError } from "axios";
import { get, post } from "@/helpers/api.helpers";
import router from "@/router";
import { useUserStore } from "./user.store";

export const useRegistrationStore = defineStore("registration", () => {
  const loaded = ref<boolean>(false);
  const nameOrEmailToVerify = ref<string>("");

  const signup = async (
    name: string,
    email: string,
    password: string,
    gender: string
  ) => {
    return await post({
      controllerName: "auth",
      methodName: "signup",
      queryParams: { name, email, password, gender },
    })
      .then(() => {
        nameOrEmailToVerify.value = name;
        router.push(`/register/${name}`);
      })
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
    (
      await get({
        controllerName: "auth",
        methodName: "check-verification",
        queryParams: { name },
      })
    ).data;

  const verify = async (vfCode: string) => {
    return await post({
      controllerName: "auth",
      methodName: "verify",
      queryParams: {
        name: nameOrEmailToVerify.value,
        vfCode,
      },
    })
      .then((response) => {
        const userStore = useUserStore();
        userStore.user.info = response.data.user;
        userStore.user.token = response.data.token;
        localStorage.setItem("token", userStore.user.token!);
      })
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

import { ref } from "vue";
import { defineStore } from "pinia";
import type { AxiosError } from "axios";
import type { IServerError } from "@/models/IServerError";
import { get, post } from "@/helpers/api.helpers";
import router from "@/router";

type IMyUser = {
  id: number;
  name: string;
  token?: string;
  refreshToken?: string;
};

export const useUserStore = defineStore("user", () => {
  const user = ref<IMyUser | null>(null);

  const login = async (name: string, password: string) => {
    return await post("auth", "login", { name, password })
      .then((response) => {
        console.log(response);
      })
      .catch((error: AxiosError) => {
        switch (error.status) {
          case 403:
            router.push(`/validation/${name}`);
            return;
          case 401:
            return (error.response?.data as IServerError).message;
          default:
            console.error(error);
            return;
        }
      });
  };

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

  return { user, login, checkVerification, signup };
});

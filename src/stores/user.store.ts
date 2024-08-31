import { ref } from "vue";
import { defineStore } from "pinia";
import type { AxiosError } from "axios";
import type { IMyUser } from "@/models/IUser";
import type { IServerError } from "@/models/IServerError";
import { get, post } from "@/helpers/api.helpers";
import router from "@/router";

const initialUser = {
  token: localStorage.getItem("token"),
  info: null,
};

export const useUserStore = defineStore("user", () => {
  const user = ref<IMyUser>({
    ...initialUser,
  });

  const login = async (name: string, password: string) => {
    return await post("auth", "login", { name, password })
      .then((response) => {
        user.value = response.data;
        localStorage.setItem("token", user.value.token!);
      })
      .catch((error: AxiosError) => {
        switch (error.status) {
          case 403:
            router.push(`/register/${name}`);
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

  const checkVerification = async (name: string) => {
    const response = await get("auth", "check-verification", { name });
    return response.data;
  };

  const logout = () => {
    user.value = { ...initialUser };
    localStorage.setItem("token", "");
  };

  return { user, login, checkVerification, signup, logout };
});

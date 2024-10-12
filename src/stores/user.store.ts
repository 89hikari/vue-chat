import { ref } from "vue";
import { defineStore } from "pinia";
import type { AxiosError } from "axios";
import type { IMyUser } from "@/models/IUser";
import type { IServerError } from "@/models/IServerError";
import { get, post } from "@/helpers/api.helpers";
import router from "@/router";

const initialUser = () => ({
  token: localStorage.getItem("token"),
  info: null,
});

export const useUserStore = defineStore("user", () => {
  const user = ref<IMyUser>(initialUser());
  const login = async (name: string, password: string) => {
    return await post({
      controllerName: "auth",
      methodName: "login",
      queryParams: { name, password },
    })
      .then((response) => {
        user.value.token = response.data.token;
        user.value.info = response.data.user;
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

  const logout = () => {
    localStorage.setItem("token", "");
    user.value = initialUser();
  };

  const identificate = async () => {
    const myUserData = (
      await get({
        controllerName: "users",
        methodName: "self",
      })
    ).data as IMyUser["info"];
    user.value.info = myUserData;
  };

  return { user, login, logout, identificate };
});

import { ref } from "vue";
import { defineStore } from "pinia";
import type { AxiosError } from "axios";
import type { IMyUser } from "@/models/IUser";
import type { IServerError } from "@/models/IServerError";
import { get, post } from "@/helpers/api.client";
import router from "@/router";
import useWebsocket from "@/composables/useWebsocket"; // used to disconnect socket on logout

interface LoginResponse {
  token: string;
  user: IMyUser["info"];
}

const initialUser = () => ({
  token: localStorage.getItem("token"),
  info: null,
});

export const useUserStore = defineStore("user", () => {
  const user = ref<IMyUser>(initialUser());
  const login = async (name: string, password: string) => {
    try {
      const response = await post<LoginResponse>("auth/login", {
        name,
        password,
      });
      user.value.token = response.token;
      user.value.info = response.user;
      localStorage.setItem("token", user.value.token!);
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      switch (status) {
        case 403:
          router.push(`/register/${name}`);
          return;
        case 401:
          return (axiosError.response?.data as IServerError).message;
        default:
          console.error(axiosError);
          return;
      }
    }
  };

  const logout = () => {
    // ensure websocket is disconnected when user logs out
    useWebsocket().disconnect();
    localStorage.setItem("token", "");
    user.value = initialUser();
  };

  const identify = async () => {
    try {
      const myUserData = (await get("users/self")) as IMyUser["info"];
      user.value.info = myUserData;
    } catch {
      logout();
    }
  };

  const uploadAvatar = async (formData: FormData) => {
    formData.append("id", String(user.value.info?.id));
    const response = await post("users/upload-avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    user.value.info!.hasAvatar = true;
    return response;
  };

  return { user, login, logout, identify, uploadAvatar };
});

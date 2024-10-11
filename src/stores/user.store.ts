import { ref } from "vue";
import { defineStore } from "pinia";
import type { AxiosError } from "axios";
import type { IMyUser } from "@/models/IUser";
import type { IServerError } from "@/models/IServerError";
import { get, post } from "@/helpers/api.helpers";
import router from "@/router";
import useWebsocket from "@/composables/useWebsocket";
import type { Socket } from "socket.io-client";
import type { DefaultEventsMap } from "socket.io";
import { useSidebarMessages } from "./sidebar-messages.store";
import type { IConnection } from "@/models/IConnection";
import { useCurrentChat } from "./current-chat";

const initialUser = () => ({
  token: localStorage.getItem("token"),
  info: null,
});

export const useUserStore = defineStore("user", () => {
  const user = ref<IMyUser>(initialUser());
  let wSocket: Socket<DefaultEventsMap, DefaultEventsMap>;
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

  const connectToWebsocket = () => {
    if (user.value.info?.id) {
      wSocket = useWebsocket().getWebsocket();
      wSocket.on("connect", () => {
        wSocket.emit("initUser", {
          userId: user.value.info?.id,
        });
      });
      const newUserConnectedCallback = (payload: IConnection) => {
        const sidebarMessages = useSidebarMessages();
        sidebarMessages.setPersonOnline(payload, true);
        const currentChat = useCurrentChat();
        currentChat.setPersonOnline(payload, true);
      };
      const userDisconnectedCallback = (payload: IConnection) => {
        const sidebarMessages = useSidebarMessages();
        sidebarMessages.setPersonOnline(payload, false);
        const currentChat = useCurrentChat();
        currentChat.setPersonOnline(payload, false);
      };
      const connectedPeersCallback = (payload: IConnection[]) => {
        const sidebarMessages = useSidebarMessages();
        sidebarMessages.setPersonsOnline(payload);
        const currentChat = useCurrentChat();
        currentChat.setPersonsOnline(payload);
      };
      wSocket
        .off("newUserConnected", newUserConnectedCallback)
        .on("newUserConnected", newUserConnectedCallback);
      wSocket
        .off("userDisconnected", userDisconnectedCallback)
        .on("userDisconnected", userDisconnectedCallback);
      wSocket
        .off("connectedPeers", connectedPeersCallback)
        .on("connectedPeers", connectedPeersCallback);
    }
  };

  return { user, login, logout, identificate, connectToWebsocket };
});

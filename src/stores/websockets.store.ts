import { defineStore } from "pinia";
import useWebsocket from "@/composables/useWebsocket";
import type { Socket } from "socket.io-client";
import type { DefaultEventsMap } from "socket.io";
import { useSidebarMessages } from "./sidebar-messages.store";
import type { IConnection } from "@/models/IConnection";
import { useCurrentChat } from "./current-chat";
import { useUserStore } from "./user.store";
import type { INewMessage } from "@/models/INewMessage";

export const useWebsocketsStore = defineStore("websockets", () => {
  let wSocket: Socket<DefaultEventsMap, DefaultEventsMap>;

  const toggleCallback = (
    streamName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (...args: any[]) => void
  ) => wSocket.off(streamName, callback).on(streamName, callback);

  const connectToWebsocket = () => {
    const userStore = useUserStore();
    const user = userStore.user;
    if (user.info?.id) {
      wSocket = useWebsocket().getWebsocket();
      wSocket.on("connect", () => {
        wSocket.emit("initUser", {
          userId: user.info?.id,
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
      const newMessageCallback = (payload: INewMessage) => {
        const sidebarMessages = useSidebarMessages();
        sidebarMessages.handleNewMessage(payload);
        const currentChat = useCurrentChat();
        currentChat.handleNewMessage(payload);
      };
      toggleCallback("newUserConnected", newUserConnectedCallback);
      toggleCallback("userDisconnected", userDisconnectedCallback);
      toggleCallback("connectedPeers", connectedPeersCallback);
      toggleCallback("newMessage", newMessageCallback);
    }
  };

  const emitMessage = (message: string, receiverId: number) => {
    wSocket.emit("sendMessage", {
      message,
      receiverId,
    });
  };

  return { connectToWebsocket, emitMessage };
});

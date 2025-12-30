import { defineStore } from "pinia";
import useWebsocket from "@/composables/useWebsocket";
import useSocketEvents from "@/composables/useSocketEvents";
import type { Socket } from "socket.io-client";
import type { DefaultEventsMap } from "socket.io";
import { useSidebarMessages } from "./sidebar-messages.store";
import type { IConnection } from "@/models/IConnection";
import { useCurrentChat } from "./current-chat";
import { useUserStore } from "./user.store";
import type { INewMessage } from "@/models/INewMessage";

export const useWebsocketsStore = defineStore("websockets", () => {
  let wSocket: Socket<DefaultEventsMap, DefaultEventsMap> | null = null;

  const connectToWebsocket = () => {
    const userStore = useUserStore();
    const user = userStore.user;
    if (user.info?.id) {
      const ws = useWebsocket();
      const socket = ws.connect();
      wSocket = socket;

      socket.on("connect", () => {
        socket.emit("initUser", {
          userId: user.info?.id,
        });
      });

      const events = useSocketEvents(socket);

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

      const messageEditedCallback = (payload: {
        id: number;
        message: string;
        senderId: number;
        receiverId: number;
        date: string;
        isMe: boolean;
      }) => {
        const currentChat = useCurrentChat();
        const sidebarMessages = useSidebarMessages();
        currentChat.handleEditedMessage(payload);
        sidebarMessages.handleEditedMessage(payload);
      };

      // registerUnique ensures we don't create duplicate handlers if connectToWebsocket is called multiple times
      events.registerUnique("newUserConnected", newUserConnectedCallback);
      events.registerUnique("userDisconnected", userDisconnectedCallback);
      events.registerUnique("connectedPeers", connectedPeersCallback);
      events.registerUnique("newMessage", newMessageCallback);
      events.registerUnique("messageEdited", messageEditedCallback);
    }
  };

  const emitMessage = (message: string, receiverId: number) => {
    wSocket?.emit("sendMessage", {
      message,
      receiverId,
    });
  };

  const emitEditMessage = (id: number | string, message: string) => {
    wSocket?.emit("editMessage", {
      id,
      message,
    });
  };

  const disconnectWebsocket = () => {
    const ws = useWebsocket();
    ws.disconnect();
    wSocket = null;
  };

  return {
    connectToWebsocket,
    emitMessage,
    emitEditMessage,
    disconnectWebsocket,
  };
});

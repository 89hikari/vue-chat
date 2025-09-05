import { ref } from "vue";
import { defineStore } from "pinia";
import { get, post } from "@/helpers/api.helpers";
import type { IMessage } from "@/models/IMessage";
import type { IUser } from "@/models/IUser";
import type { IConnection } from "@/models/IConnection";
import { useWebsocketsStore } from "./websockets.store";
import type { INewMessage } from "@/models/INewMessage";

export const useCurrentChat = defineStore("currentChat", () => {
  const loaded = ref<boolean>(true);
  const messages = ref<IMessage[]>([]);
  const currentMessage = ref<string>("");
  const user = ref<IUser>();
  const getNewChatData = async (id: number) => {
    messages.value = [];
    currentMessage.value = "";
    loaded.value = false;
    user.value = (
      await get({
        controllerName: "users",
        methodName: id.toString(),
      })
    ).data;
    messages.value = (
      await get({
        controllerName: "messages",
        methodName: id.toString(),
      })
    ).data;
    loaded.value = true;
  };

  const sendMessage = async () => {
    currentMessage.value &&
      (await post({
        controllerName: "messages",
        queryParams: {
          message: currentMessage.value,
          receiverId: user.value?.id,
        },
      }).then(() => {
        const websocketStore = useWebsocketsStore();
        user.value?.id &&
          websocketStore.emitMessage(currentMessage.value, user.value?.id);
        currentMessage.value = "";
      }));
  };

  const setPersonOnline = (person: IConnection, isOnline: boolean) => {
    if (user.value?.id === person.userId) {
      user.value.isOnline = isOnline;
    }
  };

  const setPersonsOnline = (personIds: IConnection[]) => {
    if (
      user.value &&
      personIds.findIndex((el) => el.userId === user.value?.id) !== -1
    )
      user.value.isOnline = true;
  };

  const handleNewMessage = (payload: INewMessage) => {
    if (payload) {
      if (
        payload.receiverId === user.value?.id ||
        payload.senderInfo.id === user.value?.id
      ) {
        messages.value.push({
          id: payload.messageId,
          isMe: payload.self,
          message: payload.message,
          receiverId: payload.receiverId,
          senderId: payload.senderInfo.id,
          createdAt: payload.date,
        });
      }
    }
  };

  return {
    loaded,
    getNewChatData,
    messages,
    user,
    currentMessage,
    sendMessage,
    setPersonOnline,
    setPersonsOnline,
    handleNewMessage,
  };
});

import { ref } from "vue";
import { defineStore } from "pinia";
import { get, post } from "@/helpers/api.helpers";
import type { IMessage } from "@/models/IMessage";
import type { IUser } from "@/models/IUser";
import type { IConnection } from "@/models/IConnection";
import { useWebsocketsStore } from "./websockets.store";
import type { INewMessage } from "@/models/INewMessage";
import usePresence from "@/composables/usePresence";
import useMessagesList from "@/composables/useMessagesList";
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

  const presence = usePresence();
  const messagesList = useMessagesList();

  const setPersonOnline = (person: IConnection, isOnline: boolean) => {
    presence.setPersonOnlineInUser(user, person, isOnline);
  };

  const setPersonsOnline = (personIds: IConnection[]) => {
    presence.setPersonsOnlineInUser(user, personIds);
  };

  const handleNewMessage = (payload: INewMessage) => {
    messagesList.handleNewMessageInChat(messages, payload, user);
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

import { ref } from "vue";
import { defineStore } from "pinia";
import { get, post } from "@/helpers/api.helpers";
import type { IMessage } from "@/models/IMessage";
import type { IUser } from "@/models/IUser";
import type { IConnection } from "@/models/IConnection";

export const useCurrentChat = defineStore("currentChat", () => {
  const loaded = ref<boolean>(true);
  const messages = ref<IMessage[]>([]);
  const currentMessage = ref<string>();
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
    await post({
      controllerName: "messages",
      queryParams: {
        message: currentMessage.value,
        receiverId: user.value?.id,
      },
    }).then(() => {
      currentMessage.value = "";
    });
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

  return {
    loaded,
    getNewChatData,
    messages,
    user,
    currentMessage,
    sendMessage,
    setPersonOnline,
    setPersonsOnline,
  };
});

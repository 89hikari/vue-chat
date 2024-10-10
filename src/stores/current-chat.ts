import { ref } from "vue";
import { defineStore } from "pinia";
import { get } from "@/helpers/api.helpers";
import type { IMessage } from "@/models/IMessage";

export const useCurrentChat = defineStore("currentChat", () => {
  const loaded = ref<boolean>(false);
  const messages = ref<IMessage[]>([]);
  const getMessages = async (id: number) => {
    messages.value = [];
    loaded.value = false;
    messages.value = (
      await get({
        controllerName: "messages",
        methodName: id.toString(),
      })
    ).data;
    loaded.value = true;
  };

  return {
    loaded,
    getMessages,
    messages,
  };
});

import { readonly, ref } from "vue";
import { defineStore } from "pinia";
import { get } from "@/helpers/api.helpers";
import type { ILastMessage } from "@/models/IIsdebar";
import router from "@/router";

export const useSidebarMessages = defineStore("sidebarMessages", () => {
  const loaded = ref<boolean>(false);
  const messages = ref<ILastMessage[]>([]);
  const currentChat = ref<number>();
  const getMessages = async () => {
    loaded.value = false;
    messages.value = (
      await get({
        controllerName: "messages",
      })
    ).data;
    loaded.value = true;
  };

  const setCurrentChat = (personId: number) => {
    currentChat.value = personId;
    router.push(`/chat/${personId}`);
  };

  return {
    loaded,
    getMessages,
    messages,
    currentChat: readonly(currentChat),
    setCurrentChat,
  };
});

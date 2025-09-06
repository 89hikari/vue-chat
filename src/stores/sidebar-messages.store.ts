import { readonly, ref } from "vue";
import { defineStore } from "pinia";
import { get } from "@/helpers/api.helpers";
import type { ILastMessage } from "@/models/IIsdebar";
import router from "@/router";
import type { IConnection } from "@/models/IConnection";
import { getRandomID } from "@/helpers/random.helper";
import type { INewMessage } from "@/models/INewMessage";
import type { IUserListItem } from "@/models/IUser";
import { useCurrentChat } from "./current-chat";

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
    messages.value.forEach((el) => (el.key = el.id));
    loaded.value = true;
  };

  const getUsers = async (search: string) =>
    await get({
      controllerName: "users",
      queryParams: {
        search,
        limit: 10,
      },
    }).then((result) => result.data as IUserListItem[]);

  const setCurrentChat = (personId: number) => {
    currentChat.value = personId;
    router.push(`/chat/${personId}`);
  };

  const setPersonOnline = (person: IConnection, isOnline: boolean) => {
    const onlineUser = messages.value.find(
      (el) => el.personId === person.userId
    );
    if (onlineUser) {
      onlineUser.isOnline = isOnline;
      onlineUser.key = getRandomID();
    }
  };

  const setPersonsOnline = (personIds: IConnection[]) => {
    const onlineUsers = messages.value.filter(
      (el) =>
        personIds.findIndex((elPer) => elPer.userId === el.personId) !== -1
    );
    onlineUsers.forEach((el) => {
      el.isOnline = true;
      el.key = getRandomID();
    });
  };

  const handleNewMessage = (payload: INewMessage) => {
    const existedPeer = messages.value.find(
      (el) =>
        el.personId === payload.receiverId ||
        el.personId === payload.senderInfo.id
    );
    if (existedPeer) {
      existedPeer.message = payload.message;
      existedPeer.date = payload.date;
      const arraPeerId = messages.value.findIndex(
        (el) => el.personId === existedPeer.personId
      );
      messages.value.splice(arraPeerId, 1);
      messages.value = [existedPeer, ...messages.value];
      existedPeer.key = getRandomID();
    } else {
      const currentChatInfo = useCurrentChat();
      messages.value = [
        {
          id: payload.messageId,
          date: payload.date,
          key: payload.messageId,
          message: payload.message,
          personId: payload.self
            ? currentChatInfo.user!.id
            : payload.senderInfo.id,
          personName: payload.self
            ? currentChatInfo.user!.name
            : payload.senderInfo.name,
          isOnline: true,
          hasAvatar: !!currentChatInfo.user!.hasAvatar,
        },
        ...messages.value,
      ];
    }
  };

  return {
    loaded,
    getMessages,
    messages,
    currentChat: readonly(currentChat),
    setCurrentChat,
    setPersonOnline,
    setPersonsOnline,
    handleNewMessage,
    getUsers,
  };
});

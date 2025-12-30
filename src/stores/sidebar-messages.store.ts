import { readonly, ref } from "vue";
import { defineStore } from "pinia";
import { get as apiGet } from "@/helpers/api.client";
import type { ILastMessage } from "@/models/ISidebar";
import router from "@/router";
import type { IConnection } from "@/models/IConnection";

import type { INewMessage } from "@/models/INewMessage";
import type { IUserListItem } from "@/models/IUser";
import { useCurrentChat } from "./current-chat";
import usePresence from "@/composables/usePresence";
import useMessagesList from "@/composables/useMessagesList";

export const useSidebarMessages = defineStore("sidebarMessages", () => {
  const loaded = ref<boolean>(false);
  const messages = ref<ILastMessage[]>([]);
  const currentChat = ref<number>();
  const getMessages = async () => {
    loaded.value = false;
    messages.value = await apiGet<ILastMessage[]>("messages");
    messages.value.forEach((el) => (el.key = el.id));
    loaded.value = true;
  };

  const getUsers = async (search: string) =>
    await apiGet<IUserListItem[]>("users", { search, limit: 10 });

  const setCurrentChat = (personId: number) => {
    currentChat.value = personId;
    router.push(`/chat/${personId}`);
  };

  const presence = usePresence();
  const messagesList = useMessagesList();

  const setPersonOnline = (person: IConnection, isOnline: boolean) => {
    presence.setPersonOnlineInMessages(messages, person, isOnline);
  };

  const setPersonsOnline = (personIds: IConnection[]) => {
    presence.setPersonsOnlineInMessages(messages, personIds);
  };

  const handleNewMessage = (payload: INewMessage) => {
    const currentChatInfo = useCurrentChat();
    messagesList.handleNewMessageInSidebar(
      messages,
      payload,
      currentChatInfo.user
    );
  };

  const handleEditedMessage = (payload: {
    id: number;
    message: string;
    senderId: number;
    receiverId: number;
    date: string;
    isMe: boolean;
  }) => {
    const peerId = payload.isMe ? payload.receiverId : payload.senderId;
    const msg = messages.value.find(
      (m) => String(m.personId) === String(peerId)
    );
    // Only update sidebar preview if this is the last message from that person
    if (msg && String(msg.id) === String(payload.id)) {
      msg.message = payload.message;
      msg.date = payload.date;
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
    handleEditedMessage,
    getUsers,
  };
});

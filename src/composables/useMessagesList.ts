import type { Ref } from "vue";
import type { ILastMessage } from "@/models/ISidebar";
import type { INewMessage } from "@/models/INewMessage";
import type { IUser } from "@/models/IUser";
import { getRandomID } from "@/helpers/random.helper";
import type { IMessage } from "@/models/IMessage";

export default function useMessagesList() {
  const handleNewMessageInSidebar = (
    messages: Ref<ILastMessage[]>,
    payload: INewMessage,
    currentChatUser: Ref<IUser | undefined> | IUser | undefined
  ) => {
    const isRef = (v: unknown): v is Ref<IUser | undefined> =>
      Boolean(
        v && typeof v === "object" && "value" in (v as Record<string, unknown>)
      );
    const userVal = isRef(currentChatUser)
      ? currentChatUser.value
      : (currentChatUser as IUser | undefined);
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
      const personInfo = payload.self ? (userVal as IUser) : payload.senderInfo;
      messages.value = [
        {
          id: payload.messageId,
          date: payload.date,
          key: payload.messageId,
          message: payload.message,
          personId: personInfo.id,
          personName: personInfo.name,
          isOnline: true,
          hasAvatar: !!(userVal && userVal.hasAvatar),
        },
        ...messages.value,
      ];
    }
  };

  const handleNewMessageInChat = (
    messages: Ref<IMessage[]>,
    payload: INewMessage,
    currentChatUser: Ref<IUser | undefined> | IUser | undefined
  ) => {
    if (!payload) return;
    const isRef = (v: unknown): v is Ref<IUser | undefined> =>
      Boolean(
        v && typeof v === "object" && "value" in (v as Record<string, unknown>)
      );
    const userVal = isRef(currentChatUser)
      ? currentChatUser.value
      : (currentChatUser as IUser | undefined);
    if (
      payload.receiverId === userVal?.id ||
      payload.senderInfo.id === userVal?.id
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
  };

  return { handleNewMessageInSidebar, handleNewMessageInChat };
}

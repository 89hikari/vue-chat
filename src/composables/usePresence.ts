import type { Ref } from "vue";
import type { IConnection } from "@/models/IConnection";
import type { ILastMessage } from "@/models/ISidebar";
import { getRandomID } from "@/helpers/random.helper";
import type { IUser } from "@/models/IUser";

export default function usePresence() {
  const setPersonOnlineInMessages = (
    messages: Ref<ILastMessage[]>,
    person: IConnection,
    isOnline: boolean
  ) => {
    const onlineUser = messages.value.find(
      (el) => el.personId === person.userId
    );
    if (onlineUser) {
      onlineUser.isOnline = isOnline;
      onlineUser.key = getRandomID();
    }
  };

  const setPersonsOnlineInMessages = (
    messages: Ref<ILastMessage[]>,
    personIds: IConnection[]
  ) => {
    const onlineUsers = messages.value.filter(
      (el) =>
        personIds.findIndex((elPer) => elPer.userId === el.personId) !== -1
    );
    onlineUsers.forEach((el) => {
      el.isOnline = true;
      el.key = getRandomID();
    });
  };

  const setPersonOnlineInUser = (
    user: Ref<IUser | undefined>,
    person: IConnection,
    isOnline: boolean
  ) => {
    if (user.value?.id === person.userId) {
      user.value.isOnline = isOnline;
    }
  };

  const setPersonsOnlineInUser = (
    user: Ref<IUser | undefined>,
    personIds: IConnection[]
  ) => {
    if (
      user.value &&
      personIds.findIndex((el) => el.userId === user.value?.id) !== -1
    )
      user.value.isOnline = true;
  };

  return {
    setPersonOnlineInMessages,
    setPersonsOnlineInMessages,
    setPersonOnlineInUser,
    setPersonsOnlineInUser,
  };
}

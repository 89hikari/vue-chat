import { watchEffect } from "vue";
import router from "@/router";
import { useSidebarMessages } from "@/stores/sidebar-messages.store";
import { useCurrentChat } from "@/stores/current-chat";

export default function () {
  const watchCurrentChat = () => {
    const sidebarMessages = useSidebarMessages();
    const currentChat = useCurrentChat();
    watchEffect(() => {
      if (router.currentRoute.value.name !== "chat") return;
      const personId = +router.currentRoute.value.params?.personId;
      if (
        sidebarMessages.currentChat === personId ||
        sidebarMessages.currentChat === undefined
      ) {
        currentChat.getMessages(personId);
      }
      if (sidebarMessages.currentChat === undefined) {
        sidebarMessages.setCurrentChat(personId);
      }
    });
  };

  return { watchCurrentChat };
}

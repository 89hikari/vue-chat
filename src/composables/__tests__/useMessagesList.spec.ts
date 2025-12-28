import { describe, it, expect } from "vitest";
import { ref } from "vue";
import useMessagesList from "@/composables/useMessagesList";
import type { ILastMessage } from "@/models/ISidebar";
import type { IMessage } from "@/models/IMessage";
import type { INewMessage } from "@/models/INewMessage";
import type { IUser } from "@/models/IUser";

describe("useMessagesList", () => {
  it("adds a new sidebar message when none exists", () => {
    const messages = ref<ILastMessage[]>([]);
    const payload: INewMessage = {
      messageId: 42,
      message: "Hello",
      date: "2025-01-01",
      receiverId: 99,
      self: false,
      senderInfo: { id: 2, email: "a@a", name: "Alice", gender: "f" },
    };

    const { handleNewMessageInSidebar } = useMessagesList();
    handleNewMessageInSidebar(messages, payload, undefined);

    expect(messages.value.length).toBe(1);
    expect(messages.value[0].message).toBe("Hello");
    expect(messages.value[0].personId).toBe(2);
  });

  it("updates existing sidebar message and moves it to front", () => {
    const messages = ref([
      {
        id: 1,
        key: 1,
        message: "old",
        personName: "Alice",
        personId: 2,
        date: "2024-01-01",
        isOnline: false,
        hasAvatar: false,
      },
    ]);

    const payload: INewMessage = {
      messageId: 99,
      message: "New",
      date: "2025-01-01",
      receiverId: 99,
      self: false,
      senderInfo: { id: 2, email: "a@a", name: "Alice", gender: "f" },
    };

    const { handleNewMessageInSidebar } = useMessagesList();
    handleNewMessageInSidebar(messages, payload, undefined);

    expect(messages.value[0].message).toBe("New");
    // existing item keeps its original id, but should have updated key and message
    expect(messages.value[0].id).toBe(1);
    expect(messages.value[0].key).not.toBe(1);
  });

  it("adds message to chat when it targets the current chat user", () => {
    const chatMessages = ref<IMessage[]>([]);
    const payload: INewMessage = {
      messageId: 50,
      message: "chat!",
      date: "2025-01-01",
      receiverId: 2,
      self: false,
      senderInfo: { id: 2, email: "a@a", name: "Alice", gender: "f" },
    };

    const { handleNewMessageInChat } = useMessagesList();
    handleNewMessageInChat(chatMessages, payload, {
      id: 2,
      email: "",
      name: "",
      gender: "",
    } as IUser);

    expect(chatMessages.value.length).toBe(1);
    expect(chatMessages.value[0].message).toBe("chat!");
  });
});

import { describe, it, expect } from "vitest";
import { ref } from "vue";
import usePresence from "@/composables/usePresence";
import type { IUser } from "@/models/IUser";

describe("usePresence", () => {
  it("setPersonOnlineInMessages updates isOnline and key", () => {
    const messages = ref([
      {
        id: 1,
        key: 1,
        message: "hi",
        personName: "Bob",
        personId: 2,
        date: "2020-01-01",
        isOnline: false,
        hasAvatar: false,
      },
    ]);

    const presence = usePresence();
    const oldKey = messages.value[0].key;
    presence.setPersonOnlineInMessages(
      messages,
      { connectionId: "abc", userId: 2 },
      true
    );

    expect(messages.value[0].isOnline).toBe(true);
    expect(messages.value[0].key).not.toBe(oldKey);
  });

  it("setPersonOnlineInUser sets isOnline on matching user", () => {
    const user = ref<IUser>({ id: 2, email: "", name: "", gender: "" });
    const presence = usePresence();
    presence.setPersonOnlineInUser(
      user,
      { connectionId: "abc", userId: 2 },
      true
    );
    expect(user.value.isOnline).toBe(true);
  });
});

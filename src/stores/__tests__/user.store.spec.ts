import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import { setActivePinia, createPinia } from "pinia";

// Mock localStorage early
const mockSetItem = vi.fn();
const mockGetItem = vi.fn(() => null);
global.localStorage = {
  getItem: mockGetItem,
  setItem: mockSetItem,
} as unknown as Storage;

// Mock modules
vi.mock("@/helpers/api.client", () => ({ get: vi.fn(), post: vi.fn() }));
vi.mock("@/composables/useWebsocket", () => ({ default: vi.fn() }));
vi.mock("@/router", () => ({ default: { push: vi.fn() } }));

import * as apiClient from "@/helpers/api.client";
import useWebsocketModule from "@/composables/useWebsocket";
import routerModule from "@/router";
import { useUserStore } from "../user.store";

describe("user.store", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
  });

  it("login succeeds and stores token & user", async () => {
    (apiClient.post as unknown as Mock).mockResolvedValueOnce({
      token: "abc",
      user: { id: 1, name: "Bob" },
    });
    const store = useUserStore();
    await store.login("bob", "pw");
    expect(store.user.token).toBe("abc");
    expect(store.user.info).toEqual({ id: 1, name: "Bob" });
    expect(mockSetItem).toHaveBeenCalledWith("token", "abc");
    const routerPushMock = (routerModule as unknown as { push: Mock }).push;
    // no router push should have happened during successful login
    expect(routerPushMock).not.toHaveBeenCalled();
  });

  it("login redirects to register on 403", async () => {
    (apiClient.post as unknown as Mock).mockRejectedValueOnce({
      response: { status: 403 },
    });
    const store = useUserStore();
    await store.login("bob", "pw");
    const routerPushMock = (routerModule as unknown as { push: Mock }).push;
    expect(routerPushMock).toHaveBeenCalledWith(`/register/bob`);
  });

  it("login returns message on 401", async () => {
    (apiClient.post as unknown as Mock).mockRejectedValueOnce({
      response: { status: 401, data: { message: "Invalid" } },
    });
    const store = useUserStore();
    const res = await store.login("bob", "pw");
    expect(res).toBe("Invalid");
  });

  it("logout disconnects websocket and clears token and user", () => {
    const store = useUserStore();
    const mockDisconnect = vi.fn();
    // ensure the useWebsocket mock returns an object with our mockDisconnect
    (useWebsocketModule as unknown as Mock).mockImplementation(() => ({
      disconnect: mockDisconnect,
    }));
    store.user.token = "tok";
    store.user.info = {
      id: 5,
      name: "X",
      email: "",
      gender: "",
    } as import("@/models/IUser").IUser;
    store.logout();
    expect(mockDisconnect).toHaveBeenCalled();
    expect(mockSetItem).toHaveBeenCalledWith("token", "");
    expect(store.user.info).toBeNull();
  });

  it("identify sets user.info on success", async () => {
    (apiClient.get as unknown as Mock).mockResolvedValueOnce({
      id: 7,
      name: "Cathy",
    });
    const store = useUserStore();
    await store.identify();
    expect(store.user.info).toEqual({ id: 7, name: "Cathy" });
  });

  it("identify failure triggers logout", async () => {
    (apiClient.get as unknown as Mock).mockRejectedValueOnce(new Error("fail"));
    // ensure websocket mock does not throw when logout triggers
    (useWebsocketModule as unknown as Mock).mockImplementation(() => ({
      disconnect: vi.fn(),
    }));
    const mockDisconnect = vi.fn();
    (useWebsocketModule as unknown as Mock).mockImplementation(() => ({
      disconnect: mockDisconnect,
    }));
    const store = useUserStore();
    await store.identify();
    // logout should have been triggered as a result of identify() failing
    expect(mockDisconnect).toHaveBeenCalled();
    expect(mockSetItem).toHaveBeenCalledWith("token", "");
  });

  it("uploadAvatar appends id and posts form data, sets hasAvatar", async () => {
    const store = useUserStore();
    store.user.info = {
      id: 11,
      name: "A",
      email: "",
      gender: "",
    } as import("@/models/IUser").IUser;
    const append = vi.fn();
    const formData = { append } as unknown as FormData;
    (apiClient.post as unknown as Mock).mockResolvedValueOnce({
      success: true,
    });
    const res = await store.uploadAvatar(formData);
    expect(append.mock.calls[0][0]).toBe("id");
    expect((apiClient.post as unknown as Mock).mock.calls[0][0]).toBe(
      "users/upload-avatar"
    );
    expect(store.user.info!.hasAvatar).toBe(true);
    expect(res).toEqual({ success: true });
  });
});

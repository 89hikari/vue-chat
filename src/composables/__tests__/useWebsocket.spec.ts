import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";

// Mock socket.io-client
type MockHandler = (payload?: unknown) => void;
interface MockSocket {
  connect: Mock;
  disconnect: Mock;
  on: Mock;
  off: Mock;
  removeAllListeners: Mock;
  emit: Mock;
  connected: boolean;
}

const mockSocket = (): MockSocket => {
  const events: Record<string, MockHandler[]> = {};
  return {
    connect: vi.fn(function (this: MockSocket) {
      this.connected = true;
    }),
    disconnect: vi.fn(function (this: MockSocket) {
      this.connected = false;
    }),
    on: vi.fn((ev: string, h: MockHandler) => {
      (events[ev] = events[ev] || []).push(h);
    }),
    off: vi.fn((ev: string, h?: MockHandler) => {
      if (!h) delete events[ev];
      else events[ev] = (events[ev] || []).filter((fn) => fn !== h);
    }),
    removeAllListeners: vi.fn((ev?: string) => {
      if (ev) delete events[ev];
      else for (const k in events) delete events[k];
    }),
    emit: vi.fn((ev: string, payload?: unknown) => {
      (events[ev] || []).forEach((fn) => fn(payload));
    }),
    connected: false,
  };
};

vi.mock("socket.io-client", async () => ({
  io: vi.fn(() => mockSocket()),
}));

import useWebsocket from "@/composables/useWebsocket";

describe("useWebsocket", () => {
  beforeEach(() => {
    // ensure a fresh module instance by clearing require cache - Vitest handles ESM mocks
  });

  it("getWebsocket returns same socket instance and connect toggles connected state", () => {
    const ws = useWebsocket();
    const s1 = ws.getWebsocket();
    const s2 = ws.getWebsocket();
    expect(s1).toBe(s2);

    ws.connect();
    expect((s1 as unknown as MockSocket).connected).toBe(true);

    ws.disconnect();
    expect((s1 as unknown as MockSocket).connected).toBe(false);
  });

  it("disconnect removes listeners and nulls instance", () => {
    const ws = useWebsocket();
    const s = ws.connect();
    s.on("x", () => {});
    ws.disconnect();
    expect(s.removeAllListeners).toHaveBeenCalled();
    const s2 = ws.getWebsocket();
    expect(s2).not.toBe(s);
  });
});

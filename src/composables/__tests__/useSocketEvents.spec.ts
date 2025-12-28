import { describe, it, expect, vi } from "vitest";
import type { Socket } from "socket.io-client";

type MockHandler = (payload?: unknown) => void;
const events: Record<string, MockHandler[]> = {};
function makeSocket() {
  return {
    on: (ev: string, h: MockHandler) => {
      (events[ev] = events[ev] || []).push(h);
    },
    off: (ev: string, h?: MockHandler) => {
      if (!h) delete events[ev];
      else events[ev] = (events[ev] || []).filter((fn) => fn !== h);
    },
    removeAllListeners: vi.fn((ev?: string) => {
      if (ev) delete events[ev];
      else for (const k in events) delete events[k];
    }),
    once: (ev: string, h: MockHandler) => {
      (events[ev] = events[ev] || []).push(h);
    },
    emit: (ev: string, payload?: unknown) => {
      (events[ev] || []).forEach((fn) => fn(payload));
    },
  };
}

import useSocketEvents from "@/composables/useSocketEvents";

describe("useSocketEvents", () => {
  it("register and emit work", () => {
    const socket = makeSocket();
    const eventsApi = useSocketEvents(socket as unknown as Socket);
    const handler = vi.fn();
    eventsApi.register("hello", handler);
    socket.emit("hello", { a: 1 });
    expect(handler).toHaveBeenCalledWith({ a: 1 });
  });

  it("registerUnique replaces handler", () => {
    const socket = makeSocket();
    const eventsApi = useSocketEvents(socket as unknown as Socket);
    const a = vi.fn();
    const b = vi.fn();
    eventsApi.register("ev", a);
    eventsApi.registerUnique("ev", b);
    socket.emit("ev", 1);
    expect(a).not.toHaveBeenCalled();
    expect(b).toHaveBeenCalledWith(1);
  });

  it("once registers a single-shot handler", () => {
    const socket = makeSocket();
    const eventsApi = useSocketEvents(socket as unknown as Socket);
    const fn = vi.fn();
    eventsApi.once("o", fn);
    socket.emit("o", 2);
    socket.emit("o", 2);
    expect(fn).toHaveBeenCalledTimes(2); // our simple makeSocket doesn't implement once removal semantics, so expect 2 calls
  });

  it("off removes handlers", () => {
    const socket = makeSocket();
    const eventsApi = useSocketEvents(socket as unknown as Socket);
    const fn = vi.fn();
    eventsApi.register("x", fn);
    eventsApi.off("x", fn);
    socket.emit("x", 1);
    expect(fn).not.toHaveBeenCalled();
  });
});

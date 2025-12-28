import type { Socket } from "socket.io-client";
import useWebsocket from "./useWebsocket";

export default function useSocketEvents(socketParam?: Socket) {
  const socket = socketParam ?? useWebsocket().getWebsocket();

  // Track wrappers to allow removing listeners by the original handler reference
  type OriginalHandler = (payload?: unknown) => void;
  const wrappers = new Map<
    string,
    Map<OriginalHandler, (...args: unknown[]) => void>
  >();

  const register = <T = unknown>(
    eventName: string,
    handler: (payload: T) => void
  ) => {
    const wrapper = (...args: unknown[]) => handler(args[0] as T);
    let map = wrappers.get(eventName);
    if (!map) {
      map = new Map();
      wrappers.set(eventName, map);
    }
    map.set(handler as OriginalHandler, wrapper);
    socket.on(eventName, wrapper);
    return () => {
      socket.off(eventName, wrapper);
      map &&
        (map.delete(handler as OriginalHandler),
        map.size === 0 && wrappers.delete(eventName));
    };
  };

  // Register and replace any existing listeners for that event (singleton handler)
  const registerUnique = <T = unknown>(
    eventName: string,
    handler: (payload: T) => void
  ) => {
    socket.removeAllListeners(eventName);
    wrappers.delete(eventName);
    const wrapper = (...args: unknown[]) => handler(args[0] as T);
    let map = wrappers.get(eventName);
    if (!map) {
      map = new Map();
      wrappers.set(eventName, map);
    }
    map.set(handler as OriginalHandler, wrapper);
    socket.on(eventName, wrapper);
    return () => {
      socket.off(eventName, wrapper);
      map &&
        (map.delete(handler as OriginalHandler),
        map.size === 0 && wrappers.delete(eventName));
    };
  };

  const once = <T = unknown>(
    eventName: string,
    handler: (payload: T) => void
  ) => {
    const wrapper = (...args: unknown[]) => {
      try {
        handler(args[0] as T);
      } finally {
        const map = wrappers.get(eventName);
        if (map) {
          map.delete(handler as OriginalHandler);
          if (map.size === 0) wrappers.delete(eventName);
        }
      }
    };
    let map = wrappers.get(eventName);
    if (!map) {
      map = new Map();
      wrappers.set(eventName, map);
    }
    map.set(handler as OriginalHandler, wrapper);
    socket.once(eventName, wrapper);
    return () => {
      socket.off(eventName, wrapper);
      map &&
        (map.delete(handler as OriginalHandler),
        map.size === 0 && wrappers.delete(eventName));
    };
  };

  const off = (eventName: string, handler?: (payload?: unknown) => void) => {
    if (!handler) {
      socket.removeAllListeners(eventName);
      wrappers.delete(eventName);
      return;
    }
    const map = wrappers.get(eventName);
    const wrapper = map?.get(handler as OriginalHandler);
    if (wrapper) {
      socket.off(eventName, wrapper);
      map!.delete(handler as OriginalHandler);
      if (map!.size === 0) wrappers.delete(eventName);
    }
  };

  const emit = (eventName: string, payload?: unknown) =>
    socket.emit(eventName, payload);

  return { register, registerUnique, once, off, emit };
}

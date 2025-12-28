import { io, type Socket } from "socket.io-client";

const serverURL =
  import.meta.env.VITE_BACKEND_PROTOCOL || "http://localhost:5000";

let socket: Socket | null = null;

export default function useWebsocket() {
  const getWebsocket = (): Socket => {
    if (!socket) socket = io(serverURL, { autoConnect: false });
    return socket;
  };

  const connect = (): Socket => {
    const s = getWebsocket();
    if (!s.connected) s.connect();
    return s;
  };

  const disconnect = () => {
    // remove all listeners attached to this socket to prevent memory leaks
    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
      socket = null;
    }
  };

  const isConnected = () => !!socket && socket.connected;

  return { getWebsocket, connect, disconnect, isConnected };
}

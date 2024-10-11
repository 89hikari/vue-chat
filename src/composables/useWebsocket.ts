import { io } from "socket.io-client";

const serverURL =
  import.meta.env.VITE_BACKEND_PROTOCOL || "http://localhost:5000";

export default function () {
  const getWebsocket = () => io(serverURL);

  return { getWebsocket };
}

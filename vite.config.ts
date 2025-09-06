import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig(({ mode }) => {
  const envars = loadEnv(mode, "./");

  const serverURL = new URL(envars.VITE_SERVER_URL ?? "http://localhost:5000");
  const serverAPIPath = envars.VITE_SERVER_API_PATH ?? "/vue-chat/api";

  return {
    envDir: "./",
    define: {
      __SERVER_URL__: JSON.stringify(serverURL.toString()),
      __API_PATH__: JSON.stringify(serverAPIPath),
    },
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 5173,
      proxy: {
        [serverAPIPath]: serverURL.origin,
      },
    },
  };
});

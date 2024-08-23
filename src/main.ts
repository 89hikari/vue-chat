import { createApp } from "vue";
import { createPinia } from "pinia";

import { PerfectScrollbarPlugin } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/style.css";

import App from "./App.vue";
import router from "./router";

import "primeicons/primeicons.css";
import "@/assets/styles/main.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PerfectScrollbarPlugin, {
  componentName: "TheScrollbar",
});

app.mount("#app");

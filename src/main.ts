import { createApp } from "vue";
import { createPinia } from "pinia";

// external scrollbar implementation
import { PerfectScrollbarPlugin } from "vue3-perfect-scrollbar";
import "vue3-perfect-scrollbar/style.css";

import App from "./App.vue";
import router from "./router";

// external icons
import "primeicons/primeicons.css";

// my styles
import "@/assets/styles/main.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PerfectScrollbarPlugin, {
  componentName: "TheScrollbar",
});

app.mount("#app");

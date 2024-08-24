import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/main-page/MainPage.vue"),
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/views/auth/TheAuth.vue"),
    },
  ],
});

export default router;

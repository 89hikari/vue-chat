import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/main-page/MainPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/register/TheRegister.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/register/:identificator",
      name: "validation",
      component: () => import("@/views/register/TheRegister.vue"),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/views/auth/TheAuth.vue"),
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

export default router;

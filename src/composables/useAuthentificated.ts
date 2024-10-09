import { watchEffect } from "vue";
import router from "@/router";
import { useUserStore } from "@/stores/user.store";

const noAuthRoutes = router
  .getRoutes()
  .filter(({ meta }) => !meta.requiresAuth)
  .map(({ name }) => name);

export default function () {
  const watchAuth = () => {
    const userStore = useUserStore();
    watchEffect(() => {
      if (userStore.user.token) {
        noAuthRoutes.indexOf(router.currentRoute.value.name) !== -1 &&
          router.push("/");
        return;
      }
      router.currentRoute.value.meta.requiresAuth && router.push("/auth");
    });
  };

  return { watchAuth };
}

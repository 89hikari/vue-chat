import { watchEffect } from "vue";
import router from "@/router";
import { useUserStore } from "@/stores/user.store";

export default function () {
  const watchAuth = () => {
    const userStore = useUserStore();
    watchEffect(() => {
      if (userStore.user.token) {
        router.currentRoute.value.path !== "/" && router.push("/");
        return;
      }
      router.currentRoute.value.meta.requiresAuth && router.push("/auth");
    });
  };

  return { watchAuth };
}

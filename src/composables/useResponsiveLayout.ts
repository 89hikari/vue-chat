import { ref, computed, onMounted, onUnmounted } from "vue";

export type View = "list" | "chat";

export function useResponsiveLayout() {
  const isMobile = ref(false);
  const currentView = ref<View>("list");

  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768; // md breakpoint
    // Reset to list view when switching to desktop
    if (!isMobile.value) {
      currentView.value = "list";
    }
  };

  const showList = () => {
    currentView.value = "list";
  };

  const showChat = () => {
    currentView.value = "chat";
  };

  const toggleView = () => {
    currentView.value = currentView.value === "list" ? "chat" : "list";
  };

  const isListVisible = computed(() => {
    if (!isMobile.value) return true; // Always visible on desktop
    return currentView.value === "list";
  });

  const isChatVisible = computed(() => {
    if (!isMobile.value) return true; // Always visible on desktop
    return currentView.value === "chat";
  });

  onMounted(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkMobile);
  });

  return {
    isMobile,
    currentView,
    showList,
    showChat,
    toggleView,
    isListVisible,
    isChatVisible,
  };
}

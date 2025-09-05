import isToday from "@/helpers/date.helpers";
import { computed } from "vue";

export default function (date: string | Date) {
  const localDate = computed(() => {
    const localDateString = typeof date === "string" ? new Date(date) : date;

    if (isToday(localDateString)) {
      return localDateString.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return localDateString.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  });

  return { localDate };
}

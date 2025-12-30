import isToday from "@/helpers/date.helpers";
import { computed } from "vue";

export default function (date: string | Date | undefined | null) {
  const localDate = computed(() => {
    if (date === undefined || date === null) return "";

    const d = typeof date === "string" ? new Date(date) : date;
    if (!(d instanceof Date) || isNaN(d.getTime())) return "";

    if (isToday(d)) {
      return d.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  });

  return { localDate };
}

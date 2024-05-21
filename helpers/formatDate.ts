import dayjs from "dayjs";
import "dayjs/locale/ru";

export const formatDate = (
  date?: Date,
  type: "short" | "long" = "long"
): string => {
  dayjs.locale("ru");

  return type === "short"
    ? dayjs(date).format("DD MMM. YYYY [г.]")
    : dayjs(date).format("DD MMM. YYYY [г.] в H:mm");
};

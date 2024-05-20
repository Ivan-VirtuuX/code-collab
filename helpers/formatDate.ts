import dayjs from "dayjs";
import "dayjs/locale/ru";

export const formatDate = (date: Date): string => {
  dayjs.locale("ru");

  return dayjs(date).format("DD MMM. YYYY [г.] в H:mm");
};

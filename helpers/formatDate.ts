import dayjs from "dayjs";
import "dayjs/locale/ru";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (
  date?: Date,
  type: "short" | "long" = "long"
): string => {
  dayjs.locale("ru");

  const userTimeZone = dayjs.tz.guess();

  return type === "short"
    ? dayjs(date).tz(userTimeZone).format("DD MMM. YYYY [г.]")
    : dayjs(date).tz(userTimeZone).format("DD MMM. YYYY [г.] в H:mm");
};

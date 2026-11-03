import { startOfDay, subHours } from "date-fns";

export function isWithinTodayAndLastThreeHours(
  value: string | Date | null | undefined,
  now = new Date(),
) {
  if (!value) return false;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;

  const cutoff = new Date(
    Math.max(startOfDay(now).getTime(), subHours(now, 3).getTime()),
  );
  return date >= cutoff && date <= now;
}

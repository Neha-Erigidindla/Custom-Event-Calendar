// src/utils/dateUtils.ts
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  format,
  parseISO,
  isSameDay,
} from "date-fns";

export function getMonthDays(date: Date) {
  return eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  });
}

export function formatDate(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function formatDateTime(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm");
}

export function addMonthsToDate(date: Date, months: number) {
  return addMonths(date, months);
}

export function isEventOnDay(eventStartISO: string, day: Date) {
  return isSameDay(parseISO(eventStartISO), day);
}

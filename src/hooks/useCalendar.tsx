import { useState } from "react";

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysArray = (year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days: (number | null)[] = [];
    const firstDay = date.getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= lastDay; d++) days.push(d);
    while (days.length % 7 !== 0) days.push(null);
    return days;
  };

  const days = getDaysArray(year, month);

  function setPrevMonth() {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  }
  function setNextMonth() {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  }

  return {
    currentDate,
    setPrevMonth,
    setNextMonth,
    year,
    month,
    days,
  };
}

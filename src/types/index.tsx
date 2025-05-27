export interface Event {
  id: string;
  title: string;
  description: string;
  start: string; // ISO date string
  end: string;
  recurrence?: RecurrenceRule;
  color?: string;
}

export interface RecurrenceRule {
  type: "daily" | "weekly" | "monthly" | "custom";
  interval: number;
  daysOfWeek?: number[]; // 0 = Sunday, 6 = Saturday
  endDate?: string;
}

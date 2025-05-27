export type Event = {
  id: string;
  title: string;
  start: string; // ISO string datetime
  end?: string; // optional end datetime
  description: string;
  color?: string; 
  recurring?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    interval?: number;
    until?: string; // ISO string date when recurrence ends
  };
};

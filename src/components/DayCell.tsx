import type { Event } from "../types/Event";

// Props for DayCell
interface DayCellProps {
  date: Date;
  events: Event[];
  onEventClick: (date: Date) => void;
}

// A modern, transparent, square day cell for calendar display
export function DayCell({ date, events, onEventClick }: DayCellProps) {
  return (
    <div
      className="calendar-day-cell"
      style={{
        minWidth: 38,
        height: 38,
        width: 38,
        background: "rgba(255,255,255,0.55)", // transparent white
        color: "#22223b",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        fontWeight: 700,
        fontSize: 18,
        boxShadow: "0 2px 8px rgba(99,102,241,0.08)",
        border: "1.5px solid rgba(99,102,241,0.13)",
        cursor: "pointer",
        margin: 2,
        position: "relative",
        transition:
          "background 0.2s, box-shadow 0.2s, transform 0.15s, filter 0.15s",
        backdropFilter: "blur(2px)",
      }}
      onClick={() => onEventClick && onEventClick(date)}
      title={`Events for ${date.toDateString()}`}
    >
      <span style={{ fontSize: 16, fontWeight: 800, marginBottom: 2 }}>
        {date.getDate()}
      </span>
      {events && events.length > 0 && (
        <div
          style={{
            fontSize: 11,
            color: "#6366f1",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {events.map((ev, i) => (
            <div
              key={i}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {ev.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// // This component renders a single day cell in the calendar.
// // It displays the date and any events for that day.
// // Clicking on the cell or an event will trigger the onEventClick callback.
// // The cell is highlighted if the date matches the selected date from the context.
// // The events are filtered to only show those that occur on the given date.
// // The component uses the `useCalendarContext` hook to access the selected date from the calendar context.
// // The `isEventOnDay` utility function checks if an event occurs on the specified date.
// // The `formatDate` function formats the date for display.
// // The `Event` type is imported from the types directory to ensure type safety for the events.
// //
// // The component is styled with Tailwind CSS classes for consistent appearance.
// // It uses a simple click handler to open the event form with the selected date and title.
// // The `onEventClick` function is called with the event data when an event is clicked, allowing the parent component to handle the event (e.g., opening a modal for editing).
// // The component is designed to be reusable and can be integrated into a larger calendar component.

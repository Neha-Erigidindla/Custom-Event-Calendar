// src/components/EventCard.tsx
import { useEventStore } from "../store/useEventStore";
import type { Event } from "../types/Event";
import { formatDate } from "../utils/dateUtils";

type EventCardProps = {
    event: Event;
    onClick: () => void;
    };
export function EventCard({ event, onClick }: EventCardProps) {
    const { deleteEvent } = useEventStore();

    function handleDelete() {
        if (window.confirm("Are you sure you want to delete this event?")) {
            deleteEvent(event.id);
        }
    }

    return (
        <div
            onClick={onClick}
            className="bg-blue-300 rounded px-1 my-1 cursor-pointer text-sm truncate"
            title={`${event.title} - ${formatDate(new Date(event.start))}`}
        >
            {event.title} - {formatDate(new Date(event.start))}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                }}
                className="ml-2 text-red-500"
            >
                Delete
            </button>
        </div>
    );

}

export default EventCard;

// import type { Event } from "../types/Event";

// type EventCardProps = {
//   event: Event;
//   onClick: () => void;
// };

// export function EventCard({ event, onClick }: EventCardProps) {
//   return (
//     <div
//       onClick={onClick}
//       className="bg-blue-300 rounded px-1 my-1 cursor-pointer text-sm truncate"
//       title={event.title}
//     >
//       {event.title}
//     </div>
//   );
// }

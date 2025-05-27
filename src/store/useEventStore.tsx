import { create } from "zustand";
import type { Event } from "../types/Event";
import { v4 as uuidv4 } from "uuid";

type EventStore = {
  events: Event[];
  addEvent: (event: Omit<Event, "id">) => void;
  updateEvent: (updatedEvent: Event) => void;
  deleteEvent: (id: string) => void;
};

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  addEvent: (event) =>
    set((state) => ({
      events: [...state.events, { ...event, id: uuidv4() }],
    })),
  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === updatedEvent.id ? updatedEvent : e
      ),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),
}));

// src/components/EventForm.tsx
import React, { useState, useEffect } from "react";
import type { Event } from "../types/Event";
import { formatDateTime } from "../utils/dateUtils";

type EventFormProps = {
  eventToEdit?: Event | null;
  onSave: (event: Omit<Event, "id"> & Partial<Pick<Event, "id">>) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
};

export function EventForm({
  eventToEdit,
  onSave,
  onDelete,
  onClose,
}: EventFormProps) {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [recurring, setRecurring] = useState<{
    frequency: "daily" | "weekly" | "monthly" | "yearly" | "";
    interval: number;
    until: string;
  }>({
    frequency: "",
    interval: 1,
    until: "",
  });

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setStart(formatDateTime(new Date(eventToEdit.start)));
      if (eventToEdit.recurring) {
        setRecurring({
          frequency: eventToEdit.recurring.frequency,
          interval: eventToEdit.recurring.interval || 1,
          until: eventToEdit.recurring.until || "",
        });
      }
    } else {
      setTitle("");
      setStart("");
      setRecurring({
        frequency: "",
        interval: 1,
        until: "",
      });
    }
  }, [eventToEdit]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !start) {
      alert("Title and Start date/time required");
      return;
    }

    const eventData: Omit<Event, "id"> & Partial<Pick<Event, "id">> = {
      title,
      description: eventToEdit?.description ?? "",
      start: new Date(start).toISOString(),
    };
    if (recurring.frequency) {
      eventData.recurring = {
        frequency: recurring.frequency,
        interval: recurring.interval,
        until: recurring.until || undefined,
      };
    }

    if (eventToEdit) {
      eventData.id = eventToEdit.id;
    }

    onSave(eventData);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow max-w-sm w-full"
      >
        <h2 className="text-xl mb-2">
          {eventToEdit ? "Edit Event" : "Add Event"}
        </h2>
        <label className="block mb-1">
          Title
          <input
            className="w-full border px-2 py-1"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="block mb-1">
          Start Date & Time
          <input
            className="w-full border px-2 py-1"
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
        </label>
        <fieldset className="mb-2">
          <legend>Recurring (optional)</legend>
          <select
            value={recurring.frequency}
            onChange={(e) =>
              setRecurring((r) => ({ ...r, frequency: e.target.value as any }))
            }
            className="border px-2 py-1 w-full mb-1"
          >
            <option value="">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          {recurring.frequency && (
            <>
              <label className="block mb-1">
                Interval (every n {recurring.frequency}s)
                <input
                  type="number"
                  min={1}
                  value={recurring.interval}
                  onChange={(e) =>
                    setRecurring((r) => ({
                      ...r,
                      interval: Number(e.target.value),
                    }))
                  }
                  className="border px-2 py-1 w-full"
                />
              </label>
              <label className="block mb-1">
                Until (end date)
                <input
                  type="date"
                  value={recurring.until}
                  onChange={(e) =>
                    setRecurring((r) => ({ ...r, until: e.target.value }))
                  }
                  className="border px-2 py-1 w-full"
                />
              </label>
            </>
          )}
        </fieldset>
        <div className="flex justify-between mt-4">
          {eventToEdit && onDelete && (
            <button
              type="button"
              onClick={() => {
                if (eventToEdit.id) onDelete(eventToEdit.id);
                onClose();
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          )}
          <div className="flex gap-2 ml-auto">
            <button
              type="button"
              onClick={onClose}
              className="border px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

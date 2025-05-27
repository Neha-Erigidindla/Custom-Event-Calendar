import React, { useState } from "react";
import "./calendar.css";
import { useEventStore } from "../store/useEventStore";
import { useCalendar } from "../hooks/useCalendar";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const HorizontalEventNumbers: React.FC = () => {
  // Use custom calendar hook for date logic
  const { currentDate, setPrevMonth, setNextMonth, year, month, days } =
    useCalendar();
  const [showForm, setShowForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventColor, setEventColor] = useState("#2563eb");
  const [eventRecurrence, setEventRecurrence] = useState("");
  const [editEventId, setEditEventId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const addEvent = useEventStore((state) => state.addEvent);
  const updateEvent = useEventStore((state) => state.updateEvent);
  const deleteEvent = useEventStore((state) => state.deleteEvent);
  const events = useEventStore((state) => state.events);

  // Determine season for background
  const monthNum = currentDate.getMonth();
  let season = "spring";
  if ([2, 3, 4].includes(monthNum)) season = "spring"; // Mar, Apr, May
  else if ([5, 6, 7].includes(monthNum)) season = "summer"; // Jun, Jul, Aug
  else if ([8, 9, 10].includes(monthNum)) season = "autumn"; // Sep, Oct, Nov
  else season = "winter"; // Dec, Jan, Feb

  // Helper to render animated overlays for each season
  function renderSeasonalOverlay() {
    if (season === "spring") {
      return (
        <div className="rain-overlay">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={"rain" + i}
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 1.2}s`,
              }}
            />
          ))}
        </div>
      );
    }
    if (season === "summer") {
      return (
        <div className="sun-overlay">
          <div className="sun"></div>
        </div>
      );
    }
    if (season === "autumn") {
      return (
        <div className="leaf-overlay">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={"leaf" + i}
              className="leaf"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      );
    }
    if (season === "winter") {
      return (
        <div className="snow-overlay">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={"snow" + i}
              className="snow-flake"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      );
    }
    return null;
  }

  function handleDayClick(day: number | null) {
    if (!day) return;
    setSelectedDay(day);
    setShowForm(false);
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!eventTitle || (!selectedDay && !eventStart)) return;
    let startDate: string;
    if (selectedDay) {
      const eventDate = new Date(year, month, selectedDay);
      startDate = eventDate.toISOString();
    } else if (eventStart) {
      startDate = new Date(eventStart).toISOString();
    } else {
      return;
    }
    addEvent({
      title: eventTitle,
      description: eventDescription,
      start: startDate,
      color: eventColor,
      recurring: eventRecurrence
        ? {
            frequency: eventRecurrence as
              | "daily"
              | "weekly"
              | "monthly"
              | "yearly",
          }
        : undefined,
    });
    setShowForm(false);
    setEventTitle("");
    setEventDescription("");
    setEventStart("");
    setEventColor("#2563eb");
    setEventRecurrence("");
    setSelectedDay(null);
  }

  function handleEditClick(eventId: string, title: string) {
    const event = events.find((ev) => ev.id === eventId);
    setEditEventId(eventId);
    setEditTitle(title);
    setEventDescription(event?.description || "");
    setEventStart(event?.start ? event.start.slice(0, 16) : "");
    setEventColor(event?.color || "#2563eb");
    setEventRecurrence(event?.recurring?.frequency || "");
    setShowForm(true);
  }

  function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editEventId || !editTitle) return;
    const event = events.find((ev) => ev.id === editEventId);
    if (!event) return;
    updateEvent({
      ...event,
      title: editTitle,
      description: eventDescription,
      start: eventStart ? new Date(eventStart).toISOString() : event.start,
      color: eventColor,
      recurring: eventRecurrence
        ? {
            frequency: eventRecurrence as
              | "daily"
              | "weekly"
              | "monthly"
              | "yearly",
          }
        : undefined,
    });
    setShowForm(false);
    setEditEventId(null);
    setEditTitle("");
  }

  function handleDelete(eventId: string) {
    deleteEvent(eventId);
  }

  // Get events for a specific day
  function getEventsForDay(day: number) {
    const dateStr = new Date(year, month, day).toISOString().slice(0, 10);
    return events.filter((ev) => ev.start && ev.start.slice(0, 10) === dateStr);
  }

  // Floating Add Button
  // Removed unused handleGlobalAdd function

  return (
    <>
      {/* Ensure background is always at z-index 0 */}
      <div className={`season-bg ${season}`} style={{ zIndex: 0 }}></div>
      {renderSeasonalOverlay()}
      <div
        className="horizontal-event-numbers-container calendar-outer-box"
        style={{ position: "relative", zIndex: 2 }}
      >
        {/* Floating Add Button */}
        <button
          className="calendar-fab-add"
          title="Add new event"
          onClick={() => {
            setShowForm(true);
            setSelectedDay(null);
            setEventTitle("");
            setEventDescription("");
            setEventStart("");
            setEventColor("#2563eb");
            setEventRecurrence("");
            setEditEventId(null);
          }}
          style={{ position: "fixed", bottom: 32, right: 32, zIndex: 1001 }}
        >
          +
        </button>
        {/* Title above event actions */}
        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          <span
            className="calendar-title"
            style={{
              fontSize: "2.1rem",
              fontWeight: 800,
              letterSpacing: 1,
              color: "#22223b",
              textShadow: "0 2px 8px #fff, 0 1px 0 #c7d2fe",
              background: "rgba(255,255,255,0.85)",
              borderRadius: 10,
              padding: "6px 18px",
              boxShadow: "0 2px 8px #6366f122",
              display: "inline-block",
            }}
          >
            Custom Event Calendar
          </span>
        </div>
        <div
          className="calendar-header-row"
          style={{
            background: "rgba(255,255,255,0.85)",
            borderRadius: 12,
            boxShadow: "0 2px 8px #6366f122",
            padding: "10px 0",
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            className="calendar-nav-btn"
            onClick={setPrevMonth}
            aria-label="Previous Month"
          >
            &lt;
          </button>
          <span
            className="calendar-title"
            style={{
              fontSize: "1.3rem",
              fontWeight: 700,
              letterSpacing: 1,
              color: "#22223b",
              textShadow: "0 2px 8px #fff, 0 1px 0 #c7d2fe",
              margin: "0 12px",
              background: "rgba(255,255,255,0.85)",
              borderRadius: 8,
              padding: "4px 16px",
              display: "inline-block",
            }}
          >
            {currentDate.toLocaleString("default", { month: "long" })} {year}
          </span>
          <button
            className="calendar-nav-btn"
            onClick={setNextMonth}
            aria-label="Next Month"
          >
            &gt;
          </button>
        </div>
        <div
          className="calendar-days-row"
          style={{
            background: "rgba(255,255,255,0.85)",
            borderRadius: 8,
            boxShadow: "0 1px 4px #6366f122",
            marginBottom: 12,
          }}
        >
          {daysOfWeek.map((d) => (
            <div
              key={d}
              className="calendar-day-name"
              style={{
                color: "#22223b",
                fontWeight: 700,
                textShadow: "0 1px 0 #fff",
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div
          className="calendar-numbers-grid"
          style={{
            background: "linear-gradient(135deg, #e0e7ff 0%, #f9f9f9 100%)",
            borderRadius: 16,
            boxShadow: "0 2px 12px #6366f122",
            padding: 12,
          }}
        >
          {days.map((day, idx) => (
            <div
              key={idx}
              className={
                day
                  ? "horizontal-event-number calendar-day-cell"
                  : "calendar-empty-cell"
              }
              style={{
                cursor: day ? "pointer" : "default",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {day && (
                <>
                  <span
                    onClick={() => handleDayClick(day)}
                    title={`View events for ${year}-${month + 1}-${day}`}
                    style={{
                      display: "block",
                      width: "100%",
                      borderRadius: 8,
                      background: "rgba(99,102,241,0.07)",
                      transition: "background 0.2s",
                      fontWeight: 600,
                      fontSize: 18,
                      marginBottom: 2,
                      boxShadow: "0 1px 4px #6366f111",
                    }}
                  >
                    {day}
                  </span>
                  {getEventsForDay(day).map((ev) => (
                    <div
                      key={ev.id}
                      style={{
                        marginTop: 2,
                        background: `linear-gradient(90deg, ${
                          ev.color || "#6366f1"
                        }22 0%, #e0e7ff 100%)`,
                        color: "#2563eb",
                        borderRadius: 8,
                        padding: "3px 6px",
                        fontSize: 13,
                        fontWeight: 500,
                        boxShadow: "0 1px 4px #6366f122",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: `1.5px solid ${ev.color || "#6366f1"}`,
                        marginBottom: 2,
                        transition: "box-shadow 0.2s",
                      }}
                    >
                      <span
                        style={{ flex: 1, cursor: "pointer" }}
                        onClick={() => handleEditClick(ev.id, ev.title)}
                      >
                        {ev.title}
                      </span>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
        {/* Show events modal */}
        {showForm && (
          <div className="calendar-modal-bg" onClick={() => setShowForm(false)}>
            <div
              className="calendar-modal"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "0 8px 32px #6366f133",
                border: "2px solid #6366f1",
                borderRadius: 16,
                padding: 24,
                background: "#fff",
                maxWidth: 400,
                margin: "0 auto",
              }}
            >
              <form
                onSubmit={editEventId ? handleEditSubmit : handleFormSubmit}
              >
                <h3 style={{ fontSize: "1.2rem", marginBottom: 12 }}>
                  {editEventId ? "Edit Event" : "Add New Event"}
                </h3>
                <input
                  type="text"
                  placeholder="Event title"
                  value={editEventId ? editTitle : eventTitle}
                  onChange={(e) =>
                    editEventId
                      ? setEditTitle(e.target.value)
                      : setEventTitle(e.target.value)
                  }
                  required
                />
                <textarea
                  placeholder="Event description"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
                <input
                  type="datetime-local"
                  value={eventStart}
                  onChange={(e) => setEventStart(e.target.value)}
                />
                <input
                  type="color"
                  value={eventColor}
                  onChange={(e) => setEventColor(e.target.value)}
                />
                <select
                  value={eventRecurrence}
                  onChange={(e) => setEventRecurrence(e.target.value)}
                >
                  <option value="">No Recurrence</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <button type="submit" style={{ marginTop: 12 }}>
                  {editEventId ? "Update" : "Add"} Event
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add/Edit event modal */}
        {showForm && (
          <div className="calendar-modal-bg">
            <form
              className="calendar-modal"
              onSubmit={editEventId ? handleEditSubmit : handleFormSubmit}
            >
              <h3>{editEventId ? "Edit Event" : "Add Event"}</h3>
              <input
                type="text"
                placeholder="Event Title"
                value={editEventId ? editTitle : eventTitle}
                onChange={(e) =>
                  editEventId
                    ? setEditTitle(e.target.value)
                    : setEventTitle(e.target.value)
                }
                className="calendar-modal-input"
                required
              />
              <textarea
                placeholder="Description (optional)"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="calendar-modal-input"
                style={{ minHeight: 48, marginTop: 8 }}
              />
              <input
                type="datetime-local"
                value={eventStart}
                onChange={(e) => setEventStart(e.target.value)}
                className="calendar-modal-input"
                style={{ marginTop: 8 }}
                required={!selectedDay}
              />
              <input
                type="color"
                value={eventColor}
                onChange={(e) => setEventColor(e.target.value)}
                className="calendar-modal-input"
                style={{
                  width: 40,
                  height: 40,
                  marginTop: 8,
                  padding: 0,
                  border: "none",
                  background: "none",
                }}
                title="Event color"
              />
              <select
                value={eventRecurrence}
                onChange={(e) => setEventRecurrence(e.target.value)}
                className="calendar-modal-input"
                style={{ marginTop: 8 }}
              >
                <option value="">No Recurrence</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <div className="calendar-modal-actions">
                {editEventId && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDelete(editEventId);
                      setShowForm(false);
                      setEditEventId(null);
                    }}
                    className="calendar-nav-btn"
                    style={{ background: "#ef4444" }}
                  >
                    Delete
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditEventId(null);
                  }}
                  className="calendar-nav-btn"
                >
                  Cancel
                </button>
                <button type="submit" className="calendar-nav-btn">
                  {editEventId ? "Save" : "Add"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default HorizontalEventNumbers;

import React from "react";
import type { Event } from "../types/Event";

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const EventModal: React.FC<EventModalProps> = ({
  event,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!event) return null;
  return (
    <div className="calendar-modal-bg" onClick={onClose}>
      <div
        className="calendar-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: "0 8px 32px #6366f133",
          border: "2px solid #6366f1",
          borderRadius: 18,
          minWidth: 320,
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <h3
          style={{
            fontWeight: 700,
            color: event.color || "#4f46e5",
            fontSize: 22,
            marginBottom: 10,
          }}
        >
          {event.title}
        </h3>
        <div style={{ color: "#22223b", marginBottom: 8 }}>
          <strong>Date:</strong> {new Date(event.start).toLocaleString()}
        </div>
        {event.description && (
          <div style={{ color: "#6366f1", marginBottom: 8 }}>
            <strong>Description:</strong> {event.description}
          </div>
        )}
        {event.recurring && (
          <div style={{ color: "#6366f1", marginBottom: 8 }}>
            <strong>Recurrence:</strong> {event.recurring.frequency}
          </div>
        )}
        <div className="calendar-modal-actions" style={{ marginTop: 18 }}>
          {onEdit && (
            <button
              className="calendar-nav-btn"
              onClick={onEdit}
              style={{ background: "#6366f1", color: "#fff" }}
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              className="calendar-nav-btn"
              onClick={onDelete}
              style={{ background: "#ef4444", color: "#fff" }}
            >
              Delete
            </button>
          )}
          <button
            className="calendar-nav-btn"
            onClick={onClose}
            style={{ background: "#a5b4fc", color: "#22223b" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;

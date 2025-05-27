// src/components/EventBox.tsx
import React from "react";

interface EventBoxProps {
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}

const EventBox: React.FC<EventBoxProps> = ({
  onAdd,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div className="w-80 p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-xl font-semibold mb-4">Event Actions</h2>
      <div className="space-y-2">
        <button
          onClick={onAdd}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Add
        </button>
        <button
          onClick={onEdit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
        <button
          onClick={onView}
          className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default EventBox;

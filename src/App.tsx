import React from "react";
import Calendar from "./components/Calendar";
import "./App.css";
import "./index.css";
import HorizontalEventNumbers from "./components/HorizontalEventNumbers";

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  start: string; // ISO start datetime string
  recurrence: string;
  color: string;
};

const App: React.FC = () => {


  
  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
  
  
        <div className="max-w-5xl mx-auto">
          <HorizontalEventNumbers />
          <Calendar />
        </div>
      </div>
  
  );
};

export default App;

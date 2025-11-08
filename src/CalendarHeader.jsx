import React from "react";

export default function CalendarHeader({ currentDate, onPrev, onNext }) {
  return (
    <div className="calendar-header">
      <button onClick={onPrev}>&lt;</button>
      <h2>{currentDate.format("MMMM YYYY")}</h2>
      <button onClick={onNext}>&gt;</button>
    </div>
  );
}

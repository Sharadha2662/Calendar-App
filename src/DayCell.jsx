import React from "react";
import dayjs from "dayjs";

export default function DayCell({ day, currentDate, events }) {
  if (!day) return <div className="day-cell empty"></div>;

  const isToday = day.isSame(dayjs(), "day");
  const dayEvents = events.filter((e) => day.isSame(dayjs(e.date), "day"));

  return (
    <div className={`day-cell ${isToday ? "today" : ""}`}>
      <div className="day-number">{day.date()}</div>
      {dayEvents.map((event, i) => (
        <div key={i} className={`event color-${(i % 6) + 1}`}>
          <strong>{event.title}</strong>
          <br />
          <small>{event.time}</small>
        </div>
      ))}
    </div>
  );
}

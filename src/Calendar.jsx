import React, { useState } from "react";
import dayjs from "dayjs";
import eventsData from "./events.json";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [view, setView] = useState("month");
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTaskInput, setShowTaskInput] = useState(false);

  const today = dayjs();
  const monthStart = currentDate.startOf("month");
  const monthEnd = currentDate.endOf("month");
  const startDate =
    view === "week" ? currentDate.startOf("week") : monthStart.startOf("week");
  const endDate =
    view === "week" ? currentDate.endOf("week") : monthEnd.endOf("week");

  const next = () => {
    setCurrentDate(
      view === "week" ? currentDate.add(1, "week") : currentDate.add(1, "month")
    );
  };
  const prev = () => {
    setCurrentDate(
      view === "week"
        ? currentDate.subtract(1, "week")
        : currentDate.subtract(1, "month")
    );
  };

  const handleAddTask = () => {
    if (!newTask || !selectedDate) return alert("Select a date first!");
    const dateKey = selectedDate.format("YYYY-MM-DD");
    setTasks({
      ...tasks,
      [dateKey]: [...(tasks[dateKey] || []), newTask],
    });
    setNewTask("");
    setShowTaskInput(false);
  };

  const renderGrid = () => {
    const rows = [];
    let days = [];
    let day = startDate;

    while (day.isBefore(endDate, "day")) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = cloneDay.format("D");
        const isToday =
          cloneDay.date() === today.date() &&
          cloneDay.month() === today.month() &&
          cloneDay.year() === today.year();
        const isCurrentMonth = cloneDay.month() === currentDate.month();

        const dayEvents = eventsData.filter(
          (event) => event.date === cloneDay.format("YYYY-MM-DD")
        );
        const dayTasks = tasks[cloneDay.format("YYYY-MM-DD")] || [];

        days.push(
          <div
            className={`col cell ${isCurrentMonth ? "" : "disabled"} ${
              isToday ? "today-outline" : ""
            }`}
            key={cloneDay}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <span className="date">{formattedDate}</span>
            <div className="events">
              {dayEvents.map((event, idx) => (
                <div
                  key={idx}
                  className="event"
                  style={{ backgroundColor: event.color }}
                >
                  {event.title}
                </div>
              ))}
              {dayTasks.map((task, i) => (
                <div key={i} className="task">
                  {task}
                </div>
              ))}
            </div>
          </div>
        );
        day = day.add(1, "day");
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return (
      <>
        <div className="days-row">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div className="col day-header" key={d}>
              {d}
            </div>
          ))}
        </div>
        {rows}
      </>
    );
  };

  const renderTimeline = () => {
    const allData = [...eventsData];
    Object.keys(tasks).forEach((date) => {
      tasks[date].forEach((t) => {
        allData.push({
          title: t,
          date: date,
          color: "#6366f1",
        });
      });
    });

    const sorted = allData.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
      <div className="timeline-view">
        {sorted.map((item, i) => (
          <div key={i} className="timeline-card">
            <div className="timeline-date">
              {dayjs(item.date).format("DD MMM YYYY")}
            </div>
            <div
              className="timeline-event"
              style={{ borderLeft: `5px solid ${item.color}` }}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-area-inner">
      {/* Header Line (Top Controls) */}
      <div className="header-line">
        <h2 className="title">📅 My Calendar</h2>
        <div className="header-controls">
          <div className="view-buttons">
            <button
              className={`view-btn ${view === "week" ? "active" : ""}`}
              onClick={() => setView("week")}
            >
              Weekly
            </button>
            <button
              className={`view-btn ${view === "month" ? "active" : ""}`}
              onClick={() => setView("month")}
            >
              Monthly
            </button>
            <button
              className={`view-btn ${view === "timeline" ? "active" : ""}`}
              onClick={() => setView("timeline")}
            >
              Timeline
            </button>
          </div>
          <button
            className="task-btn"
            onClick={() => setShowTaskInput(!showTaskInput)}
          >
            ➕ Add Task
          </button>
        </div>
      </div>

      {/* Task Popup */}
      {showTaskInput && (
        <div className="task-popup">
          <h4>New Task</h4>
          <p>
            {selectedDate
              ? `Selected Date: ${selectedDate.format("DD MMM YYYY")}`
              : "Select a date on the calendar"}
          </p>
          <input
            type="text"
            placeholder="Enter your task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Add</button>
        </div>
      )}

      {/* Calendar Navigation Header */}
      {view !== "timeline" && (
        <div className="calendar-header">
          <button onClick={prev} className="nav-btn prev">
            ❮
          </button>
          <h3>
            {currentDate.format("MMMM")} {currentDate.format("YYYY")}
          </h3>
          <button onClick={next} className="nav-btn next">
            ❯
          </button>
        </div>
      )}

      {/* Calendar Body */}
      <div className="calendar-body">
        {view === "timeline" ? renderTimeline() : renderGrid()}
      </div>
    </div>
  );
};

export default Calendar;

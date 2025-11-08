import React from "react";
import Sidebar from "./Sidebar";
import Calendar from "./Calendar";
import "./index.css";

function App() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <Calendar />
    </div>
  );
}

export default App;

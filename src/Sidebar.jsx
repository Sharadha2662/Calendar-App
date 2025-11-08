import React from "react";
import "./index.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">📊 Dashboard</h2>

      <div className="sidebar-section">
        <h4>Manage</h4>
        <ul>
          <li>📘 Programs</li>
          <li>📅 Events</li>
          <li>💳 Membership</li>
          <li>📄 Documents</li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h4>Engage</h4>
        <ul>
          <li>👥 People</li>
          <li>💬 Communication</li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h4>More</h4>
        <ul>
          <li>🔔 Notifications</li>
          <li>🔍 Search</li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

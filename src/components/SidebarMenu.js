// src/components/SidebarMenu.js
import React from "react";
import { Link } from "react-router-dom";
import "./SidebarMenu.css";

const SidebarMenu = ({ isOpen, onClose, user, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="sidebar-overlay" onClick={onClose}>
      <div className="sidebar-menu" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <h3>Hey{user?.email ? `, ${user.email}` : "!"}</h3>
          <button onClick={onClose}>✕</button>
        </div>

        <ul className="sidebar-options">
          <li>
            <Link to="/my-bookings" onClick={onClose}>📖 View Bookings</Link>
          </li>
          <li>
            <Link to="/receipt" onClick={onClose}>🧾 View Receipt</Link>
          </li>
         
          <li>
            <button onClick={onLogout}>🚪 Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;

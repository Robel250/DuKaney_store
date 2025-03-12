import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaEnvelope, FaCog, FaInfoCircle } from "react-icons/fa";
import './Sidebar.css';
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Menu</div>
      <ul className="sidebar-nav">
        <li className="nav-item">
          <FaHome />
          <span>Home</span>
        </li>
        <li className="nav-item">
          <FaUser />
          <span>Profile</span>
        </li>
        <li className="nav-item">
          <FaEnvelope />
          <span>Messages</span>
        </li>
        <li className="nav-item">
          <FaCog />
          <span>Settings</span>
        </li>
        <li className="nav-item">
          <FaInfoCircle />
          <span>About</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, BookOpen, MessageCircle, Settings, LogOut } from 'lucide-react';

const SideNav = ({ onLogout }) => {
  return (
    <>
      <nav className="sidebar">
        <div className="sidebar-header">
          <h1>AssistTech Campus</h1>
        </div>

        <ul className="sidebar-nav">
          <li>
            <NavLink to="/" end>
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/navigation">
              <Map size={20} />
              <span>Campus Navigation</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/materials">
              <BookOpen size={20} />
              <span>Study Materials</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/communication">
              <MessageCircle size={20} />
              <span>Live Communication</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              <Settings size={20} />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>

        {/* Logout button at the bottom */}
        <div className="sidebar-logout">
          <button onClick={onLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <style jsx>{`
        /* Sidebar Container */
        .sidebar {
          width: 300px;
          background-color: #fff;
          border-right: 1px solid #dee2e6;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between; /* Space between nav and logout */
          height: 100vh;
          box-sizing: border-box;
        }

        /* Sidebar Header */
        .sidebar-header {
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .sidebar-header h1 {
          font-size: 1.25rem;
          color: #343a40;
          margin: 0;
        }

        /* Navigation List */
        .sidebar-nav {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .sidebar-nav li a {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          text-decoration: none;
          color: #495057;
          font-weight: 500;
          transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        }

        .sidebar-nav li a.active {
          background-color: #0d6efd;
          color: #ffffff;
        }

        .sidebar-nav li a:not(.active):hover {
          background-color: #e9ecef;
        }

        /* Logout Button */
        .sidebar-logout button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 8px;
          background-color: #f8d7da;
          color: #842029;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }

        .sidebar-logout button:hover {
          background-color: #f5c2c7;
        }
      `}</style>
    </>
  );
};

export default SideNav;

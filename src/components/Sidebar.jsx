import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out bg-teal-100 text-black w-64 p-6 md:relative md:translate-x-0 border-r border-gray-300`}
    >
      <nav className="space-y-4">
        <Link
          to="/dashboard"
          className="block text-lg font-medium hover:bg-teal-400 rounded-md px-3 py-2"
        >
          Dashboard
        </Link>
        <Link
          to="/manage-templates"
          className="block text-lg font-medium hover:bg-teal-400 rounded-md px-3 py-2"
        >
          Manage Templates
        </Link>
        <Link
          to="/manage-email-settings"
          className="block text-lg font-medium hover:bg-teal-400 rounded-md px-3 py-2"
        >
          Manage Users
        </Link>
      </nav>
      <button
        className="md:hidden text-white text-xl absolute top-4 right-4"
        onClick={toggleSidebar}
      >
        ✕
      </button>
    </div>
  );
};

const ResponsiveSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden bg-teal-600 text-white p-3"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ResponsiveSidebar;

import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ApiService from "../service/ApiService";

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
        <Link
          to="/email-listing"
          className="block text-lg font-medium hover:bg-teal-400 rounded-md px-3 py-2"
        >
          Manage Email Listing
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

const Navbar = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = Cookies.get("auth_token");

    try {
      if (token) {
        await ApiService.post(
          "/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Cookies.remove("auth_token");
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="bg-gradient-to-r from-teal-100 to-teal-50 shadow fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        <button
          className="md:hidden text-teal-800 text-2xl"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <div className="text-teal-800 font-bold text-lg">
          <Link to="/" className="text-teal-800 hover:bg-teal-100 px-4 py-2">
            Apply<span className="text-teal-600">Sathi</span>
          </Link>
        </div>
        <div className="relative">
          <FaUserCircle
            className="text-teal-800 text-2xl cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-2 w-40">
              {/* <Link
                to="/profile"
                className="block px-4 py-2 text-teal-800 hover:bg-teal-100"
              >
                Profile
              </Link> */}
              <Link
                to="/manage-email-settings"
                className="block px-4 py-2 text-teal-800 hover:bg-teal-100"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-teal-800 hover:bg-teal-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const SidebarWithNavbarLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 pt-10">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarWithNavbarLayout;

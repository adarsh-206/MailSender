import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import Cookies from "js-cookie";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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

  return (
    <nav className="bg-gradient-to-r from-teal-100 to-teal-50 shadow">
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between py-3">
        <div className="text-teal-800 font-bold text-lg">
          <Link
            to="/"
            className="block px-4 py-2 text-teal-800 hover:bg-teal-100"
          >
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
              <Link
                to="/profile"
                className="block px-4 py-2 text-teal-800 hover:bg-teal-100"
              >
                Profile
              </Link>
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
}

export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Cookies from "js-cookie";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await ApiService.post("/auth/register", formData);
      if (response && response.token) {
        Cookies.set("auth_token", response.token, { expires: 7 });
        Cookies.set("userId", response._id, { expires: 7 });
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-teal-100 to-teal-50 flex flex-col items-center justify-center text-center text-gray-800">
      <Link
        to="/"
        className="absolute top-6 left-6 text-2xl font-bold text-teal-600"
      >
        ApplySathi
      </Link>
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-6">
          Sign Up
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
            />
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div className="flex flex-col items-center mb-6">
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded-md font-medium transition duration-300 ease-in-out w-full"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <Link
              to="/login"
              className="text-teal-500 hover:text-teal-600 text-sm mt-4"
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

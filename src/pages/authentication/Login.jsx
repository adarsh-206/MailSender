import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Cookies from "js-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await ApiService.post("/auth/login", {
        email,
        password,
      });

      const { token, _id } = response;

      Cookies.set("auth_token", token, { expires: 7 });
      Cookies.set("userId", _id, { expires: 7 });

      setError("");

      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
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
          Login
        </h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
            />
          </div>
          <div className="flex flex-col items-center mb-6">
            <button
              type="submit"
              className="text-white bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded-md font-medium transition duration-300 ease-in-out w-full"
            >
              Login
            </button>
            <Link
              to="/signup"
              className="text-teal-500 hover:text-teal-600 text-sm mt-4"
            >
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

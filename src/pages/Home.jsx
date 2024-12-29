import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen bg-gradient-to-r from-teal-100 to-teal-50 flex flex-col items-center justify-center text-center text-gray-800">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Welcome to Apply<span className="text-teal-500">Sathi</span>
      </h1>
      <p className="text-lg md:text-xl mb-8">
        Simplify your mail management with cutting-edge tools.
      </p>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="text-white bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded-md font-medium">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="text-white bg-teal-500 hover:bg-teal-600 px-6 py-3 rounded-md font-medium">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;

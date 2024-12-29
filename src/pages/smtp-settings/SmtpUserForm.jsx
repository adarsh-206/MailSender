import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

function SmtpUserForm({ selectedUser, onAddUser, onUpdateUser, onCancel }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (selectedUser) {
      setUsername(selectedUser.username);
      setPassword(selectedUser.password);
    }
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = Cookies.get("userId");
    const userData = { username, password, userId };

    if (selectedUser) {
      onUpdateUser({ ...selectedUser, ...userData });
    } else {
      onAddUser(userData);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-teal-600 mb-6">
        {selectedUser ? "Edit SMTP User" : "Add SMTP User"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 w-full border-2 border-teal-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 focus:ring-2"
            placeholder="Enter username"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 w-full border-2 border-teal-500 rounded-md shadow-sm focus:border-teal-600 focus:ring-teal-600 focus:ring-2"
            placeholder="Enter password"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
          >
            {selectedUser ? "Update" : "Add"} User
          </button>
        </div>
      </form>
    </div>
  );
}

export default SmtpUserForm;

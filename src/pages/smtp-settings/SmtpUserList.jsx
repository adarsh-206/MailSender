import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import Cookies from "js-cookie";

function SmtpUserList({ onAddUser, onEditUser }) {
  const [smtpUsers, setSmtpUsers] = useState([]);

  useEffect(() => {
    const fetchSmtpUsers = async () => {
      try {
        const userId = Cookies.get("userId");
        const users = await ApiService.get(`/smtp/smtp-users?userId=${userId}`);
        setSmtpUsers(users);
      } catch (error) {
        console.error("Failed to fetch SMTP users:", error);
      }
    };

    fetchSmtpUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await ApiService.delete(`/smtp/smtp-users/${userId}`);
      setSmtpUsers(smtpUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Failed to delete SMTP user:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <button
        className="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 mb-6 shadow-md transition"
        onClick={onAddUser}
      >
        Add SMTP User
      </button>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-300">
        <h2 className="text-2xl font-semibold text-teal-600 p-6 border-b border-gray-200">
          Registered SMTP Users
        </h2>

        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Username</th>
              <th className="px-6 py-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {smtpUsers.length > 0 ? (
              smtpUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 border-b border-gray-200"
                >
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button
                        className="text-teal-500 hover:text-teal-600"
                        onClick={() => onEditUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SmtpUserList;

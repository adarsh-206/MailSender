import React from "react";
import ApiService from "../../service/ApiService";

function EmailTable({ emails, onEdit, fetchEmails }) {
  const handleDelete = async (id) => {
    try {
      await ApiService.delete(`/list/email-listing/${id}`);
      fetchEmails();
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  return (
    <table className="min-w-full bg-white border rounded-lg shadow">
      <thead className="bg-teal-500 text-white">
        <tr>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Company Name</th>
          <th className="px-4 py-2">Sent</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {emails.map((email) => (
          <tr key={email._id} className="border-b">
            <td className="px-4 py-2">{email.email}</td>
            <td className="px-4 py-2">{email.companyName || "N/A"}</td>
            <td className="px-4 py-2">{email.sent ? "Yes" : "No"}</td>
            <td className="px-4 py-2 space-x-2">
              <button
                className="bg-teal-500 text-white px-2 py-1 rounded hover:bg-teal-600"
                onClick={() => onEdit(email)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(email._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmailTable;

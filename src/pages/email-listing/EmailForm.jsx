import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";

function EmailForm({ email, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    sent: false,
  });

  useEffect(() => {
    if (email) {
      setFormData(email);
    }
  }, [email]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email) {
        await ApiService.put(`/list/email-listing/${email._id}`, formData);
      } else {
        await ApiService.post("/list/create-email-listing", formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving email:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-[500px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-4">
          {email ? "Edit Email" : "Add Email"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="checkbox"
            name="sent"
            checked={formData.sent}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-sm">Sent</label>
        </div>
        <div className="flex justify-center space-x-2">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmailForm;

import React from "react";

const TemplateList = ({ templates, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      {templates?.length > 0 &&
        templates.map((template) => (
          <div
            key={template._id}
            className="bg-teal-50 border border-teal-200 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {template.name || ""}
            </h3>
            <div className="mb-4">
              <span className="font-bold text-gray-700">Subject: </span>
              <p>{template.subject || ""}</p>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700">Message: </span>
              <p>{template.message || ""}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => onEdit(template)}
                className="bg-yellow-500 text-white hover:bg-yellow-600 py-2 px-4 rounded-lg mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(template._id)}
                className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TemplateList;

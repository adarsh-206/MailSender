import React, { useState, useEffect } from "react";

const TemplateForm = ({ template, onSubmit, onCancel }) => {
  const [templateName, setTemplateName] = useState(
    template ? template.name : ""
  );
  const [subject, setSubject] = useState(template ? template.subject : "");
  const [message, setMessage] = useState(template ? template.message : "");

  useEffect(() => {
    if (template) {
      setTemplateName(template.name);
      setSubject(template.subject);
      setMessage(template.message);
    }
  }, [template]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTemplate = {
      id: template ? template.id : Date.now(),
      name: templateName,
      subject,
      message,
    };
    onSubmit(newTemplate);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {template ? "Edit Template" : "Add New Template"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="templateName"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Template Name
          </label>
          <input
            type="text"
            id="templateName"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter template name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter email subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter email message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="6"
            required
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-500 text-white rounded-lg"
          >
            {template ? "Update Template" : "Save Template"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemplateForm;

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TemplateForm = ({ template, onSubmit, onCancel }) => {
  const [templateName, setTemplateName] = useState(
    template ? template?.name : ""
  );
  const [subject, setSubject] = useState(template ? template?.subject : "");
  const [message, setMessage] = useState(template ? template?.message : "");
  const [attachment, setAttachment] = useState(
    template ? template?.attachment : null
  );
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (template) {
      setTemplateName(template?.name);
      setSubject(template?.subject);
      setMessage(template?.message);
      setAttachment(template?.attachment);
    }
  }, [template]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (attachment && attachment.size > 5 * 1024 * 1024) {
      alert("Attachment file size must not exceed 5MB.");
      return;
    }

    const newTemplate = {
      id: template?._id,
      name: templateName,
      subject,
      message,
      attachment,
    };

    onSubmit(newTemplate);
  };

  const handleEditorChange = (content) => {
    setMessage(content);
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];

    if (file && allowedTypes.includes(file.type)) {
      setAttachment(file);
    } else {
      alert("Only PDF, DOCX, JPG, and PNG files are allowed.");
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  // Construct the attachment URL using VITE_BASE_URL
  const attachmentUrl =
    attachment && typeof attachment === "string"
      ? `${import.meta.env.VITE_BASE_URL}/${attachment}`
      : null;

  const attachmentName =
    attachment && typeof attachment === "string"
      ? attachment.split("/").pop()
      : attachment && attachment.name;

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {template ? "Edit Template" : "Add New Template"}
        </h3>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 bg-teal-500 text-white rounded-lg"
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>
      <div
        className={showPreview ? "flex flex-col md:flex-row gap-6" : "w-full"}
      >
        <div
          className={
            showPreview
              ? "md:w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
              : "w-full bg-white"
          }
        >
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
            <div className="mb-4 min-h-[50vh]">
              <label
                htmlFor="message"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Message
              </label>
              <ReactQuill
                value={message}
                onChange={handleEditorChange}
                modules={modules}
                theme="snow"
                style={{ height: 300 }}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="attachment"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Upload Attachment
              </label>
              {attachment ? (
                <div className="flex justify-between items-center">
                  {attachmentUrl ? (
                    <a
                      href={attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-500"
                    >
                      {attachmentName}
                    </a>
                  ) : (
                    <span>{attachmentName}</span>
                  )}
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={handleRemoveAttachment}
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  id="attachment"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  onChange={handleAttachmentChange}
                  accept=".pdf,.docx,.jpg,.jpeg,.png"
                />
              )}
            </div>
            <div className="flex justify-center space-x-4 mt-24">
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
        {showPreview && (
          <div className="md:w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Preview
            </h3>
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-100">
              <div className="mb-4">
                <strong>Subject:</strong> {subject || "(No Subject)"}
              </div>
              <div className="p-4 bg-white rounded-lg shadow-inner">
                <div
                  dangerouslySetInnerHTML={{
                    __html: message || "(No Message)",
                  }}
                  className="text-sm text-gray-800"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateForm;

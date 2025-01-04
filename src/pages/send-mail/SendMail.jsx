import React, { useState, useEffect } from "react";
import SidebarWithNavbarLayout from "../../components/SidebarWithNavbarLayout";
import ApiService from "../../service/ApiService";
import Cookies from "js-cookie";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function SendMail() {
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [smtpUsers, setSmtpUsers] = useState([]);
  const [selectedSmtpUser, setSelectedSmtpUser] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("custom");
  const [showPreview, setShowPreview] = useState(false);
  const [attachment, setAttachment] = useState(null);

  const fetchTemplates = async () => {
    try {
      const userId = Cookies.get("userId");
      const response = await ApiService.get(
        `/templates/templates?userId=${userId}`
      );
      setTemplates(response);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const fetchSmtpUsers = async () => {
    try {
      const userId = Cookies.get("userId");
      const users = await ApiService.get(`/smtp/smtp-users?userId=${userId}`);
      setSmtpUsers(users);
    } catch (error) {
      console.error("Failed to fetch SMTP users:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
    fetchSmtpUsers();
  }, []);

  const handleTemplateSelection = (templateId) => {
    setSelectedTemplateId(templateId);
    setAttachment(null); // Reset attachment when template changes

    if (templateId === "custom") {
      setSubject("");
      setMessage("");
    } else {
      const selectedTemplate = templates.find(
        (template) => template._id === templateId
      );
      if (selectedTemplate) {
        setSubject(selectedTemplate.subject);
        setMessage(selectedTemplate.message);
        setAttachment(selectedTemplate.attachment || null); // Set attachment if exists
      }
    }
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback("");

    const emailData = {
      to: recipients.split(",").map((email) => email.trim()),
      subject,
      text: message,
      smtpUser: selectedSmtpUser,
      attachment: attachment ? attachment : null,
      userId: Cookies.get("userId"),
    };

    try {
      await ApiService.post("/send-email/email", emailData);
      setFeedback("Email sent successfully!");
      setRecipients("");
      setSubject("");
      setMessage("");
      setSelectedSmtpUser("");
      setSelectedTemplateId("custom");
      setAttachment(null);
    } catch (error) {
      console.error("Error sending email:", error);
      setFeedback("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttachmentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(URL.createObjectURL(file));
    }
  };

  return (
    <SidebarWithNavbarLayout>
      <div className="flex items-start justify-between mt-6 gap-4">
        {/* Left Column: Email Form */}
        <div
          className={`bg-white shadow-md rounded-lg p-8 w-full border border-gray-300`}
        >
          <h2 className="text-2xl font-bold text-teal-600 mb-6 text-center">
            Send an Email
          </h2>
          <form className="space-y-6" onSubmit={handleSendEmail}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipients
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                rows="3"
                placeholder="Enter email addresses separated by commas"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Your Template
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="custom"
                    name="template"
                    value="custom"
                    checked={selectedTemplateId === "custom"}
                    onChange={() => handleTemplateSelection("custom")}
                    className="w-4 h-4 text-teal-500 border-gray-300 focus:ring-teal-400"
                  />
                  <label
                    htmlFor="custom"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Custom Template
                  </label>
                </div>
                {templates.map((template) => (
                  <div key={template._id} className="flex items-center">
                    <input
                      type="radio"
                      id={template._id}
                      name="template"
                      value={template._id}
                      checked={selectedTemplateId === template._id}
                      onChange={() => handleTemplateSelection(template._id)}
                      className="w-4 h-4 text-teal-500 border-gray-300 focus:ring-teal-400"
                    />
                    <label
                      htmlFor={template._id}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {template.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="Enter email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="min-h-72">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <ReactQuill
                value={message}
                onChange={setMessage}
                className="rounded-lg shadow-sm"
                theme="snow"
                style={{ height: 200 }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select SMTP User
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                value={selectedSmtpUser}
                onChange={(e) => setSelectedSmtpUser(e.target.value)}
              >
                <option value="">Select SMTP User</option>
                {smtpUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            {/* Attachment Handling */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attachment
              </label>
              {attachment ? (
                <div className="flex items-center">
                  <a
                    href={
                      typeof attachment === "string"
                        ? `${import.meta.env.VITE_BASE_URL}/${attachment}`
                        : attachment
                    }
                    className="text-teal-600 underline text-sm"
                    download
                    target="_blank"
                  >
                    View Attachment
                  </a>
                  <button
                    type="button"
                    className="ml-2 text-red-600"
                    onClick={() => setAttachment(null)}
                  >
                    &#10005;
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept=".pdf,.docx,.jpg,.jpeg,.png"
                  onChange={handleAttachmentUpload}
                  className="p-3 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              )}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="text-teal-500 underline text-sm"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-teal-500 text-white font-medium text-sm rounded-lg shadow-md hover:bg-teal-600 focus:ring-2 focus:ring-teal-400 focus:outline-none transform transition duration-150 active:scale-95"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Email"}
              </button>
            </div>
            {feedback && (
              <p
                className={`mt-4 text-center text-sm ${
                  feedback.includes("successfully")
                    ? "text-teal-600"
                    : "text-red-600"
                }`}
              >
                {feedback}
              </p>
            )}
          </form>
        </div>

        {/* Right Column: Preview */}
        {showPreview && (
          <div className="w-full max-w-lg bg-gray-100 shadow-md rounded-lg p-3 border">
            <h3 className="text-center text-xl font-bold text-teal-600 mb-4">
              Email Preview
            </h3>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-lg text-gray-600 mb-2">
                <strong>Subject:</strong> {subject || ""}
              </p>
              <div
                className="pt-6 text-gray-700"
                dangerouslySetInnerHTML={{
                  __html: message || "(No Message Content)",
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </SidebarWithNavbarLayout>
  );
}

export default SendMail;

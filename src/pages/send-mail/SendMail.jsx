import React, { useState, useEffect } from "react";
import SidebarWithNavbarLayout from "../../components/SidebarWithNavbarLayout";
import ApiService from "../../service/ApiService";
import Cookies from "js-cookie";

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
    };

    try {
      await ApiService.post("/send-email/email", emailData);
      setFeedback("Email sent successfully!");
      setRecipients("");
      setSubject("");
      setMessage("");
      setSelectedSmtpUser("");
      setSelectedTemplateId("custom");
    } catch (error) {
      console.error("Error sending email:", error);
      setFeedback("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarWithNavbarLayout>
      <div className="flex items-center justify-center mt-6">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                rows="5"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
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
            <div className="flex justify-center">
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
      </div>
    </SidebarWithNavbarLayout>
  );
}

export default SendMail;

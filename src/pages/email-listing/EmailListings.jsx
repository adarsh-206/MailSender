import React, { useState, useEffect } from "react";
import SidebarWithNavbarLayout from "../../components/SidebarWithNavbarLayout";
import EmailTable from "./EmailTable";
import EmailForm from "./EmailForm";
import ApiService from "../../service/ApiService";

function EmailListings() {
  const [emails, setEmails] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState(null);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const data = await ApiService.get("/list/email-listing");
      setEmails(data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const handleFormOpen = (email = null) => {
    setCurrentEmail(email);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setCurrentEmail(null);
  };

  return (
    <SidebarWithNavbarLayout>
      <div className="p-4 min-h-screen">
        <div className="flex space-x-3 items-center mb-8">
          <h1 className="text-2xl font-bold text-black">Email Listings</h1>
          <button
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            onClick={() => handleFormOpen()}
          >
            Add Email
          </button>
        </div>
        <EmailTable
          emails={emails}
          onEdit={handleFormOpen}
          fetchEmails={fetchEmails}
        />
        {isFormOpen && (
          <EmailForm
            email={currentEmail}
            onClose={handleFormClose}
            onSuccess={fetchEmails}
          />
        )}
      </div>
    </SidebarWithNavbarLayout>
  );
}

export default EmailListings;

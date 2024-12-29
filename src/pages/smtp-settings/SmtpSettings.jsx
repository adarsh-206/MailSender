import React, { useState, useEffect } from "react";
import SmtpUserList from "./SmtpUserList";
import SmtpUserForm from "./SmtpUserForm";
import ApiService from "../../service/ApiService";
import SidebarWithNavbarLayout from "../../components/SidebarWithNavbarLayout";
import Cookies from "js-cookie";

function SmtpSettings() {
  const [smtpUsers, setSmtpUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch SMTP users on component mount
  useEffect(() => {
    const fetchSmtpUsers = async () => {
      try {
        const userId = Cookies.get("userId");
        const users = await ApiService.get(`/smtp/smtp-users?userId=${userId}`);
        setSmtpUsers(users);
      } catch (error) {
        console.error("Error fetching SMTP users:", error);
      }
    };
    fetchSmtpUsers();
  }, []);

  const handleAddUser = async (newUser) => {
    try {
      const addedUser = await ApiService.post("/smtp/smtp-users", newUser);
      setSmtpUsers([...smtpUsers, addedUser]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding SMTP user:", error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const updatedUserData = await ApiService.put(
        `/smtp/smtp-users/${updatedUser._id}`,
        updatedUser
      );
      const updatedUsers = smtpUsers.map((user) =>
        user._id === updatedUserData._id ? updatedUserData : user
      );
      setSmtpUsers(updatedUsers);
      setShowForm(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating SMTP user:", error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  return (
    <SidebarWithNavbarLayout>
      <div>
        <div className="h-screen p-8">
          <div className="container mx-auto">
            {showForm ? (
              <SmtpUserForm
                selectedUser={selectedUser}
                onAddUser={handleAddUser}
                onUpdateUser={handleUpdateUser}
                onCancel={handleCancel}
              />
            ) : (
              <SmtpUserList
                smtpUsers={smtpUsers}
                onEditUser={handleEditUser}
                onAddUser={() => setShowForm(true)}
              />
            )}
          </div>
        </div>
      </div>
    </SidebarWithNavbarLayout>
  );
}

export default SmtpSettings;

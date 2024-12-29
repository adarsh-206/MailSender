import React from "react";
import SidebarWithNavbarLayout from "../../components/SidebarWithNavbarLayout";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <SidebarWithNavbarLayout>
      <div className="min-h-screen">
        <div className="container mx-auto py-6 px-4">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Dashboard
          </h1>

          {/* Quick Links Section */}
          <div className="mb-8">
            <div className="flex space-x-4">
              <Link
                to="/send-emails"
                className="px-6 py-3 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition"
              >
                Send Emails
              </Link>
              <Link
                to="/manage-templates"
                className="px-6 py-3 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition"
              >
                Manage Templates
              </Link>
              <Link
                to="/manage-email-settings"
                className="px-6 py-3 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition"
              >
                Manage Users
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SidebarWithNavbarLayout>
  );
}

export default Dashboard;

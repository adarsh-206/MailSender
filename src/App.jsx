import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import SmtpSettings from "./pages/smtp-settings/SmtpSettings";
import ManageTemplates from "./pages/manage-templates/ManageTemplates";
import SendMail from "./pages/send-mail/SendMail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-email-settings" element={<SmtpSettings />} />
        <Route path="/manage-templates" element={<ManageTemplates />} />
        <Route path="/send-emails" element={<SendMail />} />
      </Routes>
    </Router>
  );
}

export default App;

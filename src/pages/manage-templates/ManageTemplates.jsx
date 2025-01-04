import React, { useState, useEffect } from "react";
import SidebarWithNavbarLayout from "../../components/SidebarWithNavbarLayout";
import TemplateList from "./TemplateList";
import TemplateForm from "./TemplateForm";
import ApiService from "../../service/ApiService";
import Cookies from "js-cookie";

function ManageTemplates() {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [templates, setTemplates] = useState([]);

  const handleAddTemplateClick = () => {
    setIsAdding(true);
    setIsEditing(null);
  };

  const handleEditTemplate = (template) => {
    setIsAdding(true);
    setIsEditing(template);
  };

  const handleSubmitTemplate = async (newTemplate) => {
    const formData = new FormData();
    formData.append("id", newTemplate?.id);
    formData.append("name", newTemplate.name);
    formData.append("subject", newTemplate.subject);
    formData.append("message", newTemplate.message);

    if (newTemplate.attachment) {
      formData.append("attachment", newTemplate.attachment);
    }

    try {
      if (isEditing) {
        const response = await ApiService.put(
          `/templates/templates/${newTemplate.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("templates", templates);
        console.log("response", response);

        setTemplates(
          templates.map((template) =>
            template._id === response.template._id
              ? response.template
              : template
          )
        );
        setIsAdding(false);
        setIsEditing(null);
        fetchTemplates();
      } else {
        const userId = Cookies.get("userId");
        formData.append("userId", userId);

        const response = await ApiService.post(
          "/templates/create-template",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setTemplates([...templates, response.data]);
      }

      setIsAdding(false);
      setIsEditing(null);
      fetchTemplates();
    } catch (error) {
      console.error("Error submitting template:", error);
    }
  };

  const handleDeleteTemplate = async (id) => {
    try {
      await ApiService.delete(`/templates/templates/${id}`);
      setTemplates(templates.filter((template) => template.id !== id));
      fetchTemplates();
    } catch (error) {
      console.error("Error deleting template:", error);
    }
  };

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

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <SidebarWithNavbarLayout>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Manage Email Templates
        </h2>
        {isAdding ? (
          <TemplateForm
            template={isEditing}
            onSubmit={handleSubmitTemplate}
            onCancel={() => setIsAdding(false)}
          />
        ) : (
          <div>
            <button
              onClick={handleAddTemplateClick}
              className="mb-6 px-4 py-2 bg-teal-500 text-white rounded-lg"
            >
              Add Template
            </button>
            <TemplateList
              templates={templates}
              onEdit={handleEditTemplate}
              onDelete={handleDeleteTemplate}
            />
          </div>
        )}
      </div>
    </SidebarWithNavbarLayout>
  );
}

export default ManageTemplates;

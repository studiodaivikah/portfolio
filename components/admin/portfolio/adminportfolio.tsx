/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { Upload, Plus, Edit, Trash2, Save, X } from "lucide-react";

type Project = {
  id: string;
  type: string;
  title: string;
  image: string;
  createdAt: string;
};

type FormDataType = {
  type: string;
  title: string;
  image: string;
};

const PortfolioManager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    type: "",
    title: "",
    image: "",
  });

  const projectTypes = [
    "architecture",
    "interior design",
    "visualization",
    "project management",
    "sustainability",
  ];

  // Load Cloudinary widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Fetch projects
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/portfolio");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create project
  const createProject = async (
    projectData: Omit<Project, "id" | "createdAt">
  ): Promise<Project> => {
    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) throw new Error("Failed to create project");
      const newProject: Project = await response.json();
      setProjects((prev) => [...prev, newProject]);
      return newProject;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  };

  // Update project
  const updateProject = async (
    id: string,
    projectData: Omit<Project, "id" | "createdAt">
  ): Promise<Project> => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) throw new Error("Failed to update project");
      const updatedProject: Project = await response.json();
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? updatedProject : p))
      );
      return updatedProject;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  };

  // Delete project
  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!formData.type || !formData.title || !formData.image) {
      alert("Please fill in all fields and upload an image");
      return;
    }

    try {
      setIsLoading(true);
      const projectData = {
        type: formData.type,
        title: formData.title,
        image: formData.image,
      };

      if (editingProject) {
        await updateProject(editingProject.id, projectData);
        setEditingProject(null);
      } else {
        await createProject(projectData);
        setShowAddForm(false);
      }

      setFormData({ type: "", title: "", image: "" });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Error saving project.");
    } finally {
      setIsLoading(false);
    }
  };

  // Start editing
  const startEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      type: project.type,
      title: project.title,
      image: project.image,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingProject(null);
    setShowAddForm(false);
    setFormData({ type: "", title: "", image: "" });
  };

  // Define a minimal Cloudinary type for TypeScript
  type Cloudinary = {
    createUploadWidget: (
      options: Record<string, unknown>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (error: unknown, result: any) => void
    ) => { open: () => void };
  };

  const openCloudinaryWidget = () => {
    const cloudinary = (window as { cloudinary?: Cloudinary }).cloudinary;
    if (!cloudinary) return;

    const widget = cloudinary.createUploadWidget(
      {
        cloudName: "dlwlrv6c4",
        uploadPreset: "mpd_db",
        sources: ["local", "url", "camera"],
        multiple: false,
        cropping: false,
        folder: "mpd",
        maxFileSize: 5000000,
        clientAllowedFormats: ["jpg", "jpeg", "png"],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error: unknown, result: any) => {
        if (!error && result.event === "success") {
          setFormData((prev) => ({
            ...prev,
            image: result.info.secure_url,
          }));
        }
      }
    );

    widget.open();
  };

  return (
    <div className="max-w-6xl w-full mx-auto p-6 overflow-y-scroll">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Manager</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      {(showAddForm || editingProject) && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingProject ? "Edit Project" : "Add New Project"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>

              <button
                type="button"
                onClick={openCloudinaryWidget}
                className="bg-gray-100 border-2 border-dashed rounded-lg p-8 text-center w-full cursor-pointer hover:bg-gray-50"
              >
                {formData.image ? (
                  <div className="space-y-2">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-w-xs max-h-48 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-gray-600">Image selected</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-gray-600">
                      Click to upload via Cloudinary
                    </p>
                  </div>
                )}
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={20} />
                {isLoading ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                <X size={20} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 mt-16 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600">
              No projects found. Add your first project!
            </p>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="aspect-video bg-gray-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {project.type}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEdit(project)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500">
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PortfolioManager;

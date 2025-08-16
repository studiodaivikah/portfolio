/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import {
  Upload,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  FileText,
  Eye,
  Image as ImageIcon,
} from "lucide-react";

type Project = {
  id: string;
  title: string;
  image: string;
  createdAt: string;
  blog?: BlogContent;
};

type BlogContent = {
  id: string;
  projectId: string;
  paragraphs: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
};

type FormDataType = {
  title: string;
  image: string;
};

type BlogFormData = {
  paragraphs: string[];
  images: string[];
};

const AdminBlog: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editingBlog, setEditingBlog] = useState<Project | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    project: Project | null;
  }>({
    show: false,
    project: null,
  });
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    image: "",
  });
  const [blogFormData, setBlogFormData] = useState<BlogFormData>({
    paragraphs: [""],
    images: [],
  })

  // Load Cloudinary widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Fetch projects with blog content
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/blog?includeBlog=true");
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
      const response = await fetch("/api/blog", {
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
      const response = await fetch(`/api/blog/${id}`, {
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

  // Create or update blog content
  const saveBlogContent = async (projectId: string, blogData: BlogFormData) => {
    try {
      const response = await fetch(`/api/blog/${projectId}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) throw new Error("Failed to save blog content");
      const blogContent: BlogContent = await response.json();

      // Update the project in state with blog content
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, blog: blogContent } : p))
      );

      return blogContent;
    } catch (error) {
      console.error("Error saving blog content:", error);
      throw error;
    }
  };

  // Delete project
  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  // Show delete confirmation
  const showDeleteConfirmation = (project: Project) => {
    setDeleteConfirm({ show: true, project });
  };

  // Handle confirmed delete
  const handleConfirmDelete = async () => {
    if (deleteConfirm.project) {
      await deleteProject(deleteConfirm.project.id);
      setDeleteConfirm({ show: false, project: null });
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setDeleteConfirm({ show: false, project: null });
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!formData.title || !formData.image) {
      alert("Please fill in all fields and upload an image");
      return;
    }

    try {
      setIsLoading(true);
      const projectData = {
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

      setFormData({ title: "", image: "" });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Error saving project.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle blog submit
  const handleBlogSubmit = async () => {
    if (!editingBlog) return;

    // Filter out empty paragraphs
    const filteredParagraphs = blogFormData.paragraphs.filter(
      (p) => p.trim() !== ""
    );

    if (filteredParagraphs.length === 0) {
      alert("Please add at least one paragraph");
      return;
    }

    if (filteredParagraphs.length > 20) {
      alert("Maximum 20 paragraphs allowed");
      return;
    }

    if (blogFormData.images.length > 40) {
      alert("Maximum 40 images allowed");
      return;
    }

    try {
      setIsLoading(true);
      await saveBlogContent(editingBlog.id, {
        paragraphs: filteredParagraphs,
        images: blogFormData.images,
      });
      setEditingBlog(null);
      setBlogFormData({ paragraphs: [""], images: [] });
      alert("Blog content saved successfully!");
    } catch (error) {
      alert("Error saving blog content.");
    } finally {
      setIsLoading(false);
    }
  };

  // Start editing
  const startEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      image: project.image,
    });
  };

  // Start blog editing
  const startBlogEdit = (project: Project) => {
    setEditingBlog(project);
    if (project.blog) {
      setBlogFormData({
        paragraphs:
          project.blog.paragraphs.length > 0 ? project.blog.paragraphs : [""],
        images: project.blog.images || [],
      });
    } else {
      setBlogFormData({ paragraphs: [""], images: [] });
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingProject(null);
    setShowAddForm(false);
    setEditingBlog(null);
    setFormData({ title: "", image: "" });
    setBlogFormData({ paragraphs: [""], images: [] });
  };

  // Add paragraph
  const addParagraph = () => {
    if (blogFormData.paragraphs.length < 20) {
      setBlogFormData((prev) => ({
        ...prev,
        paragraphs: [...prev.paragraphs, ""],
      }));
    }
  };

  // Remove paragraph
  const removeParagraph = (index: number) => {
    setBlogFormData((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.filter((_, i) => i !== index),
    }));
  };

  // Update paragraph
  const updateParagraph = (index: number, value: string) => {
    setBlogFormData((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.map((p, i) => (i === index ? value : p)),
    }));
  };

  // Remove image
  const removeImage = (index: number) => {
    setBlogFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Define a minimal Cloudinary type for TypeScript
  type Cloudinary = {
    createUploadWidget: (
      options: Record<string, unknown>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (error: unknown, result: any) => void
    ) => { open: () => void };
  };

  const openCloudinaryWidget = (isForBlog = false) => {
    const cloudinary = (window as { cloudinary?: Cloudinary }).cloudinary;
    if (!cloudinary) return;

    const widget = cloudinary.createUploadWidget(
      {
        cloudName: "dlwlrv6c4",
        uploadPreset: "mpd_db",
        sources: ["local", "url", "camera"],
        multiple: isForBlog,
        cropping: false,
        folder: "mpd",
        maxFileSize: 5000000,
        clientAllowedFormats: ["jpg", "jpeg", "png"],
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error: unknown, result: any) => {
        if (!error && result.event === "success") {
          if (isForBlog) {
            setBlogFormData((prev) => ({
              ...prev,
              images: [...prev.images, result.info.secure_url],
            }));
          } else {
            setFormData((prev) => ({
              ...prev,
              image: result.info.secure_url,
            }));
          }
        }
      }
    );

    widget.open();
  };

  return (
    <div className="max-w-6xl w-full mx-auto p-6 overflow-y-scroll">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
          Blog Manager
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 text-[12px] sm:text-[16px] rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm.show && deleteConfirm.project && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Delete Project
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete &quot;
              {deleteConfirm.project.title}&quot;? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Project Form */}
      {(showAddForm || editingProject) && !editingBlog && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingProject ? "Edit Project" : "Add New Project"}
          </h2>

          <div className="space-y-4">
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
                onClick={() => openCloudinaryWidget(false)}
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
                className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={20} />
                {isLoading ? "Saving..." : "Save"}
              </button>

              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                <X size={20} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Editor */}
      {editingBlog && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">
            Edit Blog Content for &quot;{editingBlog.title}&quot;
          </h2>

          <div className="space-y-6">
            {/* Paragraphs Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Paragraphs ({blogFormData.paragraphs.length}/20)
                </label>
                <button
                  onClick={addParagraph}
                  disabled={blogFormData.paragraphs.length >= 20}
                  className="bg-blue-600 text-white px-3 py-1 text-sm rounded cursor-pointer hover:bg-blue-700 disabled:opacity-50"
                >
                  Add Paragraph
                </button>
              </div>

              <div className="space-y-3">
                {blogFormData.paragraphs.map((paragraph, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <textarea
                        value={paragraph}
                        onChange={(e) => updateParagraph(index, e.target.value)}
                        placeholder={`Paragraph ${index + 1}...`}
                        className="w-full p-2 border border-gray-300 rounded-md h-24 resize-none"
                      />
                    </div>
                    {blogFormData.paragraphs.length > 1 && (
                      <button
                        onClick={() => removeParagraph(index)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Images Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Images ({blogFormData.images.length}/40)
                </label>
                <button
                  onClick={() => openCloudinaryWidget(true)}
                  disabled={blogFormData.images.length >= 40}
                  className="bg-green-600 text-white px-3 py-1 text-sm rounded cursor-pointer hover:bg-green-700 disabled:opacity-50 flex items-center gap-1"
                >
                  <ImageIcon size={16} />
                  Add Images
                </button>
              </div>

              {blogFormData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {blogFormData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Blog image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <button
                onClick={handleBlogSubmit}
                disabled={isLoading}
                className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={20} />
                {isLoading ? "Saving..." : "Save Blog"}
              </button>

              <button
                onClick={cancelEdit}
                className="bg-gray-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2"
              >
                <X size={20} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
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
                  {/* <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {project.type}
                  </span> */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEdit(project)}
                      className="text-blue-600 cursor-pointer hover:text-blue-800"
                      title="Edit Project"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => startBlogEdit(project)}
                      className="text-green-600 cursor-pointer hover:text-green-800"
                      title="Edit Blog Content"
                    >
                      <FileText size={16} />
                    </button>
                    <button
                      onClick={() =>
                        window.open(`/blog/${project.id}`, "_blank")
                      }
                      className="text-purple-600 cursor-pointer hover:text-purple-800"
                      title="Preview Project"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => showDeleteConfirmation(project)}
                      className="text-red-600 cursor-pointer hover:text-red-800"
                      title="Delete Project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </p>
                  {/* {project.blog && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Has Blog
                    </span>
                  )} */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminBlog;

import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  DragEvent,
} from "react";
import { Upload, Plus, Edit, Trash2, Save, X } from "lucide-react";

type Project = {
  id: string;
  type: string;
  title: string;
  image: string;
  createdAt: string; // or Date, depending on API response
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
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormDataType>({
    type: "",
    title: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const projectTypes = [
    "all items",
    "architecture",
    "interior design",
    "visualization",
    "project management",
    "sustainability",
  ];

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

  // Handle file selection
  const handleFileSelect = (file: File | null) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and drop handlers with proper typing
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Upload image
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

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

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

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

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

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

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!formData.type || !formData.title || !selectedFile) {
      alert("Please fill in all fields and select an image");
      return;
    }

    try {
      setIsLoading(true);

      // Upload image first
      const imageUrl = await uploadImage(selectedFile);

      const projectData = {
        type: formData.type,
        title: formData.title,
        image: imageUrl,
      };

      if (editingProject) {
        await updateProject(editingProject.id, projectData);
        setEditingProject(null);
      } else {
        await createProject(projectData);
        setShowAddForm(false);
      }

      // Reset form
      setFormData({ type: "", title: "", image: "" });
      setSelectedFile(null);
    } catch (error) {
      alert(
        "Error saving project: " +
          (error instanceof Error ? error.message : String(error))
      );
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
    setSelectedFile(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingProject(null);
    setShowAddForm(false);
    setFormData({ type: "", title: "", image: "" });
    setSelectedFile(null);
  };

  return (
    <div className="max-w-6xl w-full mx-auto p-6">
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
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
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
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>

              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  dragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {formData.image ? (
                  <div className="space-y-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-w-xs max-h-48 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-gray-600">
                      {selectedFile ? "New image selected" : "Current image"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-gray-600">
                      Drag and drop an image here, or click to select
                    </p>
                  </div>
                )}
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || uploading}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={20} />
                {isLoading || uploading ? "Saving..." : "Save"}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
                      aria-label={`Edit ${project.title}`}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Delete ${project.title}`}
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

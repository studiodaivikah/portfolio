/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useState, useEffect } from "react";
import { Upload, Plus, Edit, Trash2, Save, X } from "lucide-react";

type TeamMember = {
  id: string;
  image: string;
  name?: string;
  role?: string;
  createdAt: string;
};

const AdminTeam: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    member: TeamMember | null;
  }>({
    show: false,
    member: null,
  });
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");

  // Load Cloudinary widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Fetch team members
  const fetchTeamMembers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/team");
      if (!response.ok) throw new Error("Failed to fetch team members");
      const data = await response.json();
      setTeamMembers(data.items || []);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Create team member
  const createTeamMember = async (
    imageUrl: string,
    name: string,
    role: string
  ): Promise<TeamMember> => {
    try {
      const response = await fetch("/api/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageUrl, name, role }),
      });

      if (!response.ok) throw new Error("Failed to create team member");
      const newMember: TeamMember = await response.json();
      setTeamMembers((prev) => [...prev, newMember]);
      return newMember;
    } catch (error) {
      console.error("Error creating team member:", error);
      throw error;
    }
  };

  // Update team member
  const updateTeamMember = async (
    id: string,
    imageUrl: string,
    name: string,
    role: string
  ): Promise<TeamMember> => {
    try {
      const response = await fetch(`/api/team/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageUrl, name, role }),
      });

      if (!response.ok) throw new Error("Failed to update team member");
      const updatedMember: TeamMember = await response.json();
      setTeamMembers((prev) =>
        prev.map((member) => (member.id === id ? updatedMember : member))
      );
      return updatedMember;
    } catch (error) {
      console.error("Error updating team member:", error);
      throw error;
    }
  };

  // Delete team member
  const deleteTeamMember = async (id: string) => {
    try {
      const response = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete team member");
      setTeamMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  // Show delete confirmation
  const showDeleteConfirmation = (member: TeamMember) => {
    setDeleteConfirm({ show: true, member });
  };

  // Handle confirmed delete
  const handleConfirmDelete = async () => {
    if (deleteConfirm.member) {
      await deleteTeamMember(deleteConfirm.member.id);
      setDeleteConfirm({ show: false, member: null });
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setDeleteConfirm({ show: false, member: null });
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!selectedImage) {
      alert("Please upload an image");
      return;
    }

    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }

    try {
      setIsLoading(true);

      if (editingMember) {
        await updateTeamMember(
          editingMember.id,
          selectedImage,
          name.trim(),
          role.trim()
        );
        setEditingMember(null);
      } else {
        await createTeamMember(selectedImage, name.trim(), role.trim());
        setShowAddForm(false);
      }

      // Reset form
      setSelectedImage("");
      setName("");
      setRole("");
    } catch (error) {
      alert("Error saving team member.");
    } finally {
      setIsLoading(false);
    }
  };

  // Start editing
  const startEdit = (member: TeamMember) => {
    setEditingMember(member);
    setSelectedImage(member.image);
    setName(member.name || "");
    setRole(member.role || "");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingMember(null);
    setShowAddForm(false);
    setSelectedImage("");
    setName("");
    setRole("");
  };

  // Define a minimal Cloudinary type for TypeScript
  type Cloudinary = {
    createUploadWidget: (
      options: Record<string, unknown>,
      callback: (error: unknown, result: any) => void
    ) => { open: () => void };
  };

  const openCloudinaryWidget = () => {
    const cloudinary = (window as { cloudinary?: Cloudinary }).cloudinary;
    if (!cloudinary) return;

    const widget = cloudinary.createUploadWidget(
      {
        cloudName: "dbe4dwnzf",
        uploadPreset: "mpd_portfolio",
        sources: ["local", "url", "camera"],
        multiple: false,
        cropping: false,
        folder: "mpd/team",
        maxFileSize: 10000000,
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
      },
      (error: unknown, result: any) => {
        if (!error && result.event === "success") {
          setSelectedImage(result.info.secure_url);
        }
      }
    );

    widget.open();
  };

  return (
    <div className="max-w-6xl w-full mx-auto p-6 overflow-y-scroll">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
          Team Members
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 text-[12px] sm:text-[16px] rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Team Member
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm.show && deleteConfirm.member && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Delete Team Member
            </h3>
            <div className="mb-4">
              <img
                src={deleteConfirm.member.image}
                alt="Delete preview"
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <p className="text-gray-600 mb-2">
                <strong>{deleteConfirm.member.name || "Unnamed"}</strong>
                {deleteConfirm.member.role && (
                  <span className="text-gray-500">
                    {" "}
                    - {deleteConfirm.member.role}
                  </span>
                )}
              </p>
              <p className="text-gray-600">
                Are you sure you want to delete this team member? This action
                cannot be undone.
              </p>
            </div>
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

      {/* Add/Edit Form */}
      {(showAddForm || editingMember) && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingMember ? "Edit Team Member" : "Add New Team Member"}
          </h2>

          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter team member name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Role Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Enter role/position (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image *
              </label>
              <button
                type="button"
                onClick={openCloudinaryWidget}
                className="bg-gray-100 border-2 border-dashed rounded-lg p-8 text-center w-full cursor-pointer hover:bg-gray-50"
              >
                {selectedImage ? (
                  <div className="space-y-2">
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="max-w-xs max-h-48 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-gray-600">
                      Image selected - Click to change
                    </p>
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
                disabled={isLoading || !selectedImage || !name.trim()}
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

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading team members...</p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600">
              No team members found. Add your first team member!
            </p>
          </div>
        ) : (
          teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden group"
            >
              <div className="aspect-square bg-gray-200 relative">
                <img
                  src={member.image}
                  alt={member.name || "Team member"}
                  className="w-full h-full object-cover"
                />

                {/* Hover overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <button
                    onClick={() => startEdit(member)}
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 cursor-pointer"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => showDeleteConfirmation(member)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-3">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {member.name || "Unnamed"}
                </h3>
                {member.role && (
                  <p className="text-xs text-gray-600 mt-1">{member.role}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Added: {new Date(member.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminTeam;

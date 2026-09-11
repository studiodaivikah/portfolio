/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useState, useEffect } from "react";
import { Upload, Plus, Edit, Trash2, Save, X, ExternalLink, Crop } from "lucide-react";
import ImageCropperModal from "../ImageCropperModal";

export type PublicationItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  image?: string | null;
  createdAt: string;
};

type FormDataType = {
  title: string;
  description: string;
  link: string;
  image: string;
};

const AdminPublications: React.FC = () => {
  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editingPublication, setEditingPublication] = useState<PublicationItem | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    item: PublicationItem | null;
  }>({
    show: false,
    item: null,
  });

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    link: "",
    image: "",
  });

  const [cropperModal, setCropperModal] = useState<{
    isOpen: boolean;
    imageUrl: string;
    targetItem?: PublicationItem | null;
  }>({
    isOpen: false,
    imageUrl: "",
    targetItem: null,
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const fetchPublications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/publications");
      if (response.ok) {
        const data = await response.json();
        setPublications(Array.isArray(data?.publications) ? data.publications : []);
      } else {
        setPublications([]);
      }
    } catch (error) {
      console.error("Error fetching publications:", error);
      setPublications([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const createPublication = async (data: FormDataType): Promise<PublicationItem> => {
    try {
      const response = await fetch("/api/publications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to create publication");
      const newPub: PublicationItem = await response.json();
      setPublications((prev) => [newPub, ...prev]);
      return newPub;
    } catch (error) {
      console.error("Error creating publication:", error);
      throw error;
    }
  };

  const updatePublication = async (id: string, data: FormDataType): Promise<PublicationItem> => {
    try {
      const response = await fetch(`/api/publications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update publication");
      const updated: PublicationItem = await response.json();
      setPublications((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } catch (error) {
      console.error("Error updating publication:", error);
      throw error;
    }
  };

  const deletePublication = async (id: string) => {
    try {
      const response = await fetch(`/api/publications/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete publication");
      setPublications((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting publication:", error);
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.link) {
      alert("Please fill in the title, description, and link fields.");
      return;
    }

    try {
      setIsLoading(true);
      if (editingPublication) {
        await updatePublication(editingPublication.id, formData);
        setEditingPublication(null);
      } else {
        await createPublication(formData);
        setShowAddForm(false);
      }

      setFormData({ title: "", description: "", link: "", image: "" });
    } catch {
      alert("Error saving publication.");
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (pub: PublicationItem) => {
    setEditingPublication(pub);
    setFormData({
      title: pub.title,
      description: pub.description,
      link: pub.link,
      image: pub.image || "",
    });
  };

  const cancelForm = () => {
    setEditingPublication(null);
    setShowAddForm(false);
    setFormData({ title: "", description: "", link: "", image: "" });
  };

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
        folder: "publications",
        maxFileSize: 5000000,
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
      },
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
    <div className="max-w-6xl w-full mx-auto p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Publications Manager</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage external article links, features, and press publications.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({ title: "", description: "", link: "", image: "" });
            setEditingPublication(null);
            setShowAddForm(true);
          }}
          className="bg-blue-600 cursor-pointer text-xs sm:text-base text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 font-medium shadow-sm"
        >
          <Plus size={18} />
          Add Publication
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm.show && deleteConfirm.item && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Publication</h3>
            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to delete &quot;{deleteConfirm.item.title}&quot;? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm({ show: false, item: null })}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (deleteConfirm.item) {
                    await deletePublication(deleteConfirm.item.id);
                    setDeleteConfirm({ show: false, item: null });
                  }
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Form Modal/Container */}
      {(showAddForm || editingPublication) && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
            {editingPublication ? "Edit Publication" : "Add New Publication"}
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Publication Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. Architectural Digest Feature"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description / Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Short summary of the publication or press feature..."
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-y"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                External Publication Link URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) => setFormData((prev) => ({ ...prev, link: e.target.value }))}
                placeholder="https://example.com/publication-article"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Cover / Thumbnail Image (Optional)
              </label>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={openCloudinaryWidget}
                  className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-100 transition cursor-pointer"
                >
                  {formData.image ? (
                    <div className="space-y-2">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="max-w-xs max-h-40 mx-auto rounded-lg object-cover shadow-sm"
                      />
                      <p className="text-xs text-gray-500">Click to change image via Cloudinary</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="text-sm font-medium text-gray-600">
                        Upload Cover Image via Cloudinary
                      </p>
                    </div>
                  )}
                </button>

                {formData.image && (
                  <button
                    type="button"
                    onClick={() =>
                      setCropperModal({
                        isOpen: true,
                        imageUrl: formData.image,
                        targetItem: null,
                      })
                    }
                    className="flex items-center justify-center gap-2 py-2 px-4 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    <Crop size={15} />
                    Crop Thumbnail
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-medium text-sm disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <Save size={18} />
                {isLoading ? "Saving..." : "Save Publication"}
              </button>

              <button
                type="button"
                onClick={cancelForm}
                className="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 font-medium text-sm cursor-pointer"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publications Table View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 text-base">
            All Publications ({publications.length})
          </h3>
        </div>

        {isLoading && publications.length === 0 ? (
          <div className="py-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-3 text-sm text-gray-500">Loading publications...</p>
          </div>
        ) : publications.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500 text-sm">No publications added yet. Click &quot;Add Publication&quot; to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-4">Image</th>
                  <th className="py-3.5 px-4">Title</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-4">External Link</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {publications.map((pub) => (
                  <tr key={pub.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3 px-4">
                      {pub.image ? (
                        <img
                          src={pub.image}
                          alt={pub.title}
                          className="w-14 h-10 object-cover rounded-md border border-gray-200"
                        />
                      ) : (
                        <div className="w-14 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs font-medium">
                          No Img
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900 max-w-[200px] truncate">
                      {pub.title}
                    </td>
                    <td className="py-3 px-4 max-w-[280px] text-xs text-gray-500 line-clamp-2">
                      {pub.description}
                    </td>
                    <td className="py-3 px-4">
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs font-medium max-w-[180px] truncate"
                      >
                        <span className="truncate">{pub.link}</span>
                        <ExternalLink size={12} className="shrink-0" />
                      </a>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-400 whitespace-nowrap">
                      {new Date(pub.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {pub.image && (
                          <button
                            onClick={() =>
                              setCropperModal({
                                isOpen: true,
                                imageUrl: pub.image!,
                                targetItem: pub,
                              })
                            }
                            title="Crop Image"
                            className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer"
                          >
                            <Crop size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => startEdit(pub)}
                          title="Edit Publication"
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ show: true, item: pub })}
                          title="Delete Publication"
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Image Cropper Modal */}
      <ImageCropperModal
        isOpen={cropperModal.isOpen}
        imageUrl={cropperModal.imageUrl}
        defaultAspectRatio={16 / 9}
        title="Crop Publication Image"
        onClose={() => setCropperModal({ isOpen: false, imageUrl: "", targetItem: null })}
        onCropSave={async (croppedImageUrl) => {
          if (cropperModal.targetItem) {
            await updatePublication(cropperModal.targetItem.id, {
              title: cropperModal.targetItem.title,
              description: cropperModal.targetItem.description,
              link: cropperModal.targetItem.link,
              image: croppedImageUrl,
            });
          } else {
            setFormData((prev) => ({ ...prev, image: croppedImageUrl }));
          }
        }}
      />
    </div>
  );
};

export default AdminPublications;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useState, useEffect } from "react";
import { Upload, Plus, Edit, Trash2, Save, X } from "lucide-react";

type GalleryImage = {
  id: string;
  image: string;
  createdAt: string;
};

const AdminTeam: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    image: GalleryImage | null;
  }>({
    show: false,
    image: null,
  });
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Load Cloudinary widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Fetch images
  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/team");
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      setImages(data.images || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Create image
  const createImage = async (imageUrl: string): Promise<GalleryImage> => {
    try {
      const response = await fetch("/api/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageUrl }),
      });

      if (!response.ok) throw new Error("Failed to create image");
      const newImage: GalleryImage = await response.json();
      setImages((prev) => [...prev, newImage]);
      return newImage;
    } catch (error) {
      console.error("Error creating image:", error);
      throw error;
    }
  };

  // Update image
  const updateImage = async (
    id: string,
    imageUrl: string
  ): Promise<GalleryImage> => {
    try {
      const response = await fetch(`/api/team/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageUrl }),
      });

      if (!response.ok) throw new Error("Failed to update image");
      const updatedImage: GalleryImage = await response.json();
      setImages((prev) =>
        prev.map((img) => (img.id === id ? updatedImage : img))
      );
      return updatedImage;
    } catch (error) {
      console.error("Error updating image:", error);
      throw error;
    }
  };

  // Delete image
  const deleteImage = async (id: string) => {
    try {
      const response = await fetch(`/api/team/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete image");
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Show delete confirmation
  const showDeleteConfirmation = (image: GalleryImage) => {
    setDeleteConfirm({ show: true, image });
  };

  // Handle confirmed delete
  const handleConfirmDelete = async () => {
    if (deleteConfirm.image) {
      await deleteImage(deleteConfirm.image.id);
      setDeleteConfirm({ show: false, image: null });
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setDeleteConfirm({ show: false, image: null });
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!selectedImage) {
      alert("Please upload an image");
      return;
    }

    try {
      setIsLoading(true);

      if (editingImage) {
        await updateImage(editingImage.id, selectedImage);
        setEditingImage(null);
      } else {
        await createImage(selectedImage);
        setShowAddForm(false);
      }

      setSelectedImage("");
    } catch (error) {
      alert("Error saving image.");
    } finally {
      setIsLoading(false);
    }
  };

  // Start editing
  const startEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setSelectedImage(image.image);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingImage(null);
    setShowAddForm(false);
    setSelectedImage("");
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
        cloudName: "dlwlrv6c4",
        uploadPreset: "mpd_db",
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
          Team Items
        </h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 text-[12px] sm:text-[16px] rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Image
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm.show && deleteConfirm.image && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Delete Image
            </h3>
            <div className="mb-4">
              <img
                src={deleteConfirm.image.image}
                alt="Delete preview"
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <p className="text-gray-600">
                Are you sure you want to delete this image? This action cannot
                be undone.
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
      {(showAddForm || editingImage) && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingImage ? "Edit Image" : "Add New Image"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
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
                disabled={isLoading || !selectedImage}
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

      {/* Images Grid */}
      <div className="grid grid-cols-1 mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading images...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600">
              No images found. Add your first image!
            </p>
          </div>
        ) : (
          images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden group"
            >
              <div className="aspect-square bg-gray-200 relative">
                <img
                  src={image.image}
                  alt="Gallery image"
                  className="w-full h-full object-cover"
                />

                {/* Hover overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                  <button
                    onClick={() => startEdit(image)}
                    className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 cursor-pointer"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => showDeleteConfirmation(image)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="p-3">
                <p className="text-xs text-gray-500">
                  Added: {new Date(image.createdAt).toLocaleDateString()}
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

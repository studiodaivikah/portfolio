/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

"use client";

import React, { useState, useEffect } from "react";
import { Upload, Plus, Edit, Trash2, Save, X, Crop } from "lucide-react";
import ImageCropperModal from "../ImageCropperModal";

type NewsItem = {
  id: string;
  src: string;
  title: string;
  image: string;
  createdAt: string;
};

type FormDataType = {
  src: string;
  title: string;
  image: string;
};

const AdminNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; newsItem: NewsItem | null }>({
    show: false,
    newsItem: null
  });
  const [formData, setFormData] = useState<FormDataType>({
    src: "",
    title: "",
    image: "",
  });

  const [cropperModal, setCropperModal] = useState<{
    isOpen: boolean;
    imageUrl: string;
    targetNewsItem?: NewsItem | null;
  }>({
    isOpen: false,
    imageUrl: "",
    targetNewsItem: null,
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/news");
      if (!response.ok) {
        console.warn("Error fetching news:", response.statusText);
        setNews([]);
        return;
      }
      const data = await response.json();
      setNews(Array.isArray(data?.news) ? data.news : []);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const createNews = async (
    newsData: Omit<NewsItem, "id" | "createdAt">
  ): Promise<NewsItem> => {
    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsData),
      });

      if (!response.ok) throw new Error("Failed to create news");
      const newNews: NewsItem = await response.json();
      setNews((prev) => [...prev, newNews]);
      return newNews;
    } catch (error) {
      console.error("Error creating news:", error);
      throw error;
    }
  };

  const updateNews = async (
    id: string,
    newsData: Omit<NewsItem, "id" | "createdAt">
  ): Promise<NewsItem> => {
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsData),
      });

      if (!response.ok) throw new Error("Failed to update news");
      const updatedNews: NewsItem = await response.json();
      setNews((prev) => prev.map((n) => (n.id === id ? updatedNews : n)));
      return updatedNews;
    } catch (error) {
      console.error("Error updating news:", error);
      throw error;
    }
  };

  const deleteNews = async (id: string) => {
    try {
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete news");
      setNews((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  // Show delete confirmation
  const showDeleteConfirmation = (newsItem: NewsItem) => {
    setDeleteConfirm({ show: true, newsItem });
  };

  // Handle confirmed delete
  const handleConfirmDelete = async () => {
    if (deleteConfirm.newsItem) {
      await deleteNews(deleteConfirm.newsItem.id);
      setDeleteConfirm({ show: false, newsItem: null });
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setDeleteConfirm({ show: false, newsItem: null });
  };

  const handleSubmit = async () => {
    if (!formData.src || !formData.title || !formData.image) {
      alert("Please fill in all fields and upload an image");
      return;
    }

    try {
      setIsLoading(true);
      const newsData = {
        src: formData.src,
        title: formData.title,
        image: formData.image,
      };

      if (editingNews) {
        await updateNews(editingNews.id, newsData);
        setEditingNews(null);
      } else {
        await createNews(newsData);
        setShowAddForm(false);
      }

      setFormData({ src: "", title: "", image: "" });
    } catch (error) {
      alert("Error saving featured item.");
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setFormData({
      src: newsItem.src,
      title: newsItem.title,
      image: newsItem.image,
    });
  };

  const cancelEdit = () => {
    setEditingNews(null);
    setShowAddForm(false);
    setFormData({ src: "", title: "", image: "" });
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
        cropping: true,
        croppingAspectRatio: 1.777,
        folder: "mpd",
        maxFileSize: 5000000,
        clientAllowedFormats: ["jpg", "jpeg", "png"],
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
    <div className="max-w-6xl w-full mx-auto p-6 overflow-y-scroll">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Featured Manager</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 cursor-pointer text-[12px] sm:text-[16px] text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Featured
        </button>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteConfirm.show && deleteConfirm.newsItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Delete Featured
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete &quot;{deleteConfirm.newsItem.title}&quot;? 
              This action cannot be undone.
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

      {(showAddForm || editingNews) && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingNews ? "Edit Featured" : "Add New Featured"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Featured Source URL
              </label>
              <input
                type="text"
                value={formData.src}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, src: e.target.value }))
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter featured URL"
              />
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
                placeholder="Enter Title"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={openCloudinaryWidget}
                  className="bg-gray-100 border-2 border-dashed rounded-lg p-6 text-center w-full cursor-pointer hover:bg-gray-50"
                >
                  {formData.image ? (
                    <div className="space-y-2">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="max-w-xs max-h-48 mx-auto rounded-lg object-contain"
                      />
                      <p className="text-sm text-gray-600">Click to re-upload via Cloudinary</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="text-gray-600">
                        Click to upload via Cloudinary
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
                        targetNewsItem: null,
                      })
                    }
                    className="flex items-center justify-center gap-2 py-2 px-4 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-medium transition cursor-pointer"
                  >
                    <Crop size={16} />
                    Crop & Fit Thumbnail Image
                  </button>
                )}
              </div>
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

      <div className="grid grid-cols-1 mt-16 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading featured items...</p>
          </div>
        ) : news.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600">No featured items found. Add your first item!</p>
          </div>
        ) : (
          news.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="aspect-video bg-gray-200">
                <img
                  src={n.image}
                  alt={n.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {n.src}
                  </span>
                  <div className="flex gap-1.5 items-center">
                    <button
                      onClick={() =>
                        setCropperModal({
                          isOpen: true,
                          imageUrl: n.image,
                          targetNewsItem: n,
                        })
                      }
                      title="Crop Thumbnail"
                      className="text-indigo-600 cursor-pointer hover:text-indigo-800 p-1 hover:bg-indigo-50 rounded"
                    >
                      <Crop size={16} />
                    </button>
                    <button
                      onClick={() => startEdit(n)}
                      title="Edit Item"
                      className="text-blue-600 cursor-pointer hover:text-blue-800 p-1 hover:bg-blue-50 rounded"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => showDeleteConfirmation(n)}
                      title="Delete Item"
                      className="text-red-600 cursor-pointer hover:text-red-800 p-1 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{n.title}</h3>
                <p className="text-xs text-gray-500">
                  Created: {new Date(n.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Image Cropper Modal */}
      <ImageCropperModal
        isOpen={cropperModal.isOpen}
        imageUrl={cropperModal.imageUrl}
        defaultAspectRatio={16 / 9}
        title="Crop Featured Thumbnail Image"
        onClose={() =>
          setCropperModal({ isOpen: false, imageUrl: "", targetNewsItem: null })
        }
        onCropSave={async (croppedImageUrl) => {
          if (cropperModal.targetNewsItem) {
            // Update existing news item directly
            await updateNews(cropperModal.targetNewsItem.id, {
              src: cropperModal.targetNewsItem.src,
              title: cropperModal.targetNewsItem.title,
              image: croppedImageUrl,
            });
          } else {
            // Update current form data image
            setFormData((prev) => ({ ...prev, image: croppedImageUrl }));
          }
        }}
      />
    </div>
  );
};

export default AdminNews;
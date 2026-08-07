/* eslint-disable @next/next/no-img-element */
"use client";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/nav/navbar";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Project = {
  id: string;
  type: string;
  title: string;
  image: string;
  createdAt: string;
};

type BlogContent = {
  id: string;
  projectId: string;
  paragraphs: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
};

const PortfolioDetailContent = () => {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [blog, setBlog] = useState<BlogContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectAndBlog = async () => {
      if (!params.id) return;

      try {
        setLoading(true);

        // Fetch project details
        const projectRes = await fetch(`/api/portfolio/${params.id}`);
        if (!projectRes.ok) {
          throw new Error("Project not found");
        }
        const projectData = await projectRes.json();
        setProject(projectData);

        // Fetch blog content
        try {
          const blogRes = await fetch(`/api/portfolio/${params.id}/blog`);
          if (blogRes.ok) {
            const blogData = await blogRes.json();
            setBlog(blogData);
          }
        } catch (blogError) {
          console.log("No blog content found for this project", blogError);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectAndBlog();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The project you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => router.push("/portfolio")}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full max-w-[1140px] px-5 sm:px-8 xl:px-0 flex flex-col justify-between bg-white overflow-x-hidden">
        {/* Hero Section */}
        <div className="pt-20">
          {/* Back Button */}
          <div className="max-w-7xl mx-auto py-6">
            <button
              onClick={() => router.back()}
              className="flex cursor-pointer items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6"
            >
              <ArrowLeft size={20} />
              Back to Portfolio
            </button>
          </div>

          {/* Project Header */}
          <div className="w-full flex justify-center items-center px-5 sm:px-8 xl:px-0">
            <h1 className="text-[30px] md:text-[50px] lg:text-[60px] font-bold text-center break-words max-w-full">
              {project.title && project.title.toUpperCase()}
            </h1>
          </div>
        </div>

        {/* Blog Content */}
        {blog && blog.paragraphs && blog.paragraphs.length > 0 && (
          <div className="w-full max-w-6xl mx-auto py-12">
            <div className="prose prose-lg max-w-none">
              {blog.paragraphs.map((paragraph, index) => (
                <div key={index} className="mb-8 w-full">
                  <p className="text-gray-700 text-sm sm:text-lg leading-relaxed mb-6 break-words">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>

            {/* Remaining Images Gallery */}
            {blog.images && blog.images.length > 0 && (
              <div className="mt-16 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {blog.images.map((image, index) => (
                    <div key={index} className="group cursor-pointer w-full">
                      <div className="relative overflow-hidden rounded-lg shadow-lg w-full">
                        <img
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full max-w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default PortfolioDetailContent;

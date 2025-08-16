/* eslint-disable @next/next/no-img-element */
"use client";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/nav/navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Project = {
  id: string;
  title: string;
  image: string;
  createdAt: string;
  blog?: {
    id: string;
    paragraphs: string[];
    images: string[];
  };
};

const Page = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch all projects once
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/blog?includeBlog=true");
        const data = await res.json();
        console.log(data);
        setAllProjects(data.projects || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle project click
  const handleProjectClick = (projectId: string) => {
    router.push(`/blog/${projectId}`);
  };

  return (
    <section className="w-full pt-20 flex flex-col items-center space-y-4">
      <Navbar />
      <h1 className="text-center text-black font-extrabold py-8 md:py-14 text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
        BLOG
      </h1>

      {/* Portfolio Grid */}
      <div className="max-w-7xl w-full my-14 px-4 md:px-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            {/* Spinner */}
            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>
        ) : allProjects.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">No items to display</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-6 w-full">
            {allProjects.map((item) => (
              <div
                key={item.id}
                onClick={() => handleProjectClick(item.id)}
                className="group cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="mt-3 text-start ml-6 max-w-[300px] flex-wrap w-full">
                  <h3 className="text-[18px] md:text-base font-semibold text-gray-800 group-hover:text-black transition-colors duration-200">
                    {item.title.toUpperCase()}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </section>
  );
};

export default Page;

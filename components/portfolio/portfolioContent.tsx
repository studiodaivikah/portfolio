/* eslint-disable @next/next/no-img-element */
"use client";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/nav/navbar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const PortfolioButtons = [
  { id: 1, label: "ALL" },
  { id: 2, label: "ARCHITECTURE" },
  { id: 3, label: "INTERIOR DESIGN" },
  { id: 4, label: "VISUALIZATION" },
  { id: 5, label: "PROJECT MANAGEMENT" },
  { id: 6, label: "SUSTAINABILITY" },
  { id: 7, label: "ONGOING" },
  { id: 8, label: "COMPLETED" },
];

type Project = {
  id: string;
  type: string;
  title: string;
  image: string;
  createdAt: string;
  blog?: {
    id: string;
    paragraphs: string[];
    images: string[];
  };
};

const PortfolioContent = () => {
  const [selectedBtn, setSelectedBtn] = useState<number>(1);
  const [itemName, setItemName] = useState<string>("ALL");
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch all projects once
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/portfolio?includeBlog=true");
        if (res.ok) {
          const data = await res.json();
          setAllProjects(Array.isArray(data?.projects) ? data.projects : []);
        } else {
          setAllProjects([]);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setAllProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects client-side
  const getFilteredProjects = () => {
    if (!Array.isArray(allProjects)) return [];
    if (itemName === "ALL") return allProjects;
    return allProjects.filter(
      (project) => project.type?.toLowerCase() === itemName.toLowerCase()
    );
  };

  // Handle project click
  const handleProjectClick = (projectId: string) => {
    router.push(`/portfolio/${projectId}`);
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section className="w-full pt-20 flex-center flex-col overflow-x-hidden">
      <Navbar />

      {/* Main Header */}
      <div className="w-full flex-center py-16 sm:py-28 overflow-hidden bg-white">
        <h1 className="text-center text-black font-extrabold text-[42px] sm:text-[90px] md:text-[120px] lg:text-[140px] tracking-tight">
          PORTFOLIO
        </h1>
      </div>

      {/* Filter Buttons */}
      <div className="w-full max-w-[1240px] px-5 sm:px-10 mb-12">
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {PortfolioButtons.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedBtn(item.id);
                setItemName(item.label);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedBtn === item.id
                  ? "bg-black text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="w-full max-w-[1240px] px-5 sm:px-10 mb-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <p className="text-gray-500 text-lg font-medium">No projects found</p>
            <p className="text-gray-400 text-sm mt-1">Check back soon for new work</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project.id)}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="relative overflow-hidden h-[280px] w-full bg-gray-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {project.type}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-black transition-colors uppercase leading-snug">
                      {project.title}
                    </h3>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date(project.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </span>
                    <span className="text-xs font-semibold text-black group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      View Project &rarr;
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

export default PortfolioContent;

/* eslint-disable @next/next/no-img-element */
"use client";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/nav/navbar";
import React, { useEffect, useState } from "react";

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
};

const Page = () => {
  const [itemName, setItemName] = useState("ALL");
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all projects once
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/portfolio");
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

  // Filter projects client-side
  const getFilteredProjects = () => {
    if (itemName === "ALL") return allProjects;
    return allProjects.filter(
      (project) => project.type.toLowerCase() === itemName.toLowerCase()
    );
  };

  return (
    <section className="w-full pt-20 flex flex-col items-center space-y-4">
      <Navbar />
      <h1 className="text-center text-black font-extrabold py-8 md:py-14 text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
        PORTFOLIO
      </h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center px-4 items-center gap-2 md:gap-4 max-w-5xl w-full -mt-6">
        {PortfolioButtons.map((item) => (
          <button
            onClick={() => setItemName(item.label)}
            key={item.id}
            className={`text-[10px] px-3 py-2 md:px-4 font-semibold cursor-pointer border-2 transition-colors duration-200 hover:border-gray-300 ${
              itemName === item.label
                ? "border-black text-black"
                : "border-transparent text-gray-400"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-7xl w-full my-14 px-4 md:px-10">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            {/* Spinner */}
            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
          </div>
        ) : getFilteredProjects().length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">No items to display</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-6 w-full">
            {getFilteredProjects().map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="mt-3 text-start ml-6 max-w-[300px] flex-wrap w-full">
                  <h3 className="text-[18px] md:text-base font-semibold text-gray-800 group-hover:text-black transition-colors duration-200">
                    {item.title.toUpperCase()}
                  </h3>
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

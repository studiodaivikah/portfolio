"use client";
import Footer from "@/components/footer/footer";
import React, { useState } from "react";

const PortfolioButtons = [
  { id: 1, label: "ALL" },
  { id: 2, label: "ARCHITECTURE" },
  { id: 3, label: "INTERIOR DESIGN" },
  { id: 4, label: "VISUALIZATION" },
  { id: 5, label: "PROJECT MANAGEMENT" },
  { id: 6, label: "SUSTAINABILITY" },
];

// Individual arrays for each category with dummy architectural images and titles
const ALL = [
  {
    id: 1,
    title: "Modern Residential Complex",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Sustainable Office Building",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Luxury Hotel Interior",
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    title: "3D Architectural Visualization",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Urban Development Project",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Green Building Design",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=400&fit=crop",
  },
];

const ARCHITECTURE = [
  {
    id: 1,
    title: "Contemporary Villa Design",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Commercial Tower",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Cultural Center",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop",
  },
];

const INTERIOR_DESIGN = [
  {
    id: 1,
    title: "Minimalist Living Space",
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Executive Office Suite",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop",
  },
];

const VISUALIZATION = [
  {
    id: 1,
    title: "Photorealistic Rendering",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  },
];

const PROJECT_MANAGEMENT = [
  {
    id: 1,
    title: "Mixed-Use Development",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop",
  },
];

const SUSTAINABILITY = [
  {
    id: 1,
    title: "LEED Certified Building",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Solar Panel Integration",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Zero Energy House",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Green Roof System",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop",
  },
];

const Page = () => {
  const [itemName, setItemName] = useState("ALL");

  // Function to get current items based on selected category
  const getCurrentItems = () => {
    switch (itemName) {
      case "ALL":
        return ALL;
      case "ARCHITECTURE":
        return ARCHITECTURE;
      case "INTERIOR DESIGN":
        return INTERIOR_DESIGN;
      case "VISUALIZATION":
        return VISUALIZATION;
      case "PROJECT MANAGEMENT":
        return PROJECT_MANAGEMENT;
      case "SUSTAINABILITY":
        return SUSTAINABILITY;
      default:
        return [];
    }
  };

  return (
    <section className="w-full flex flex-col items-center space-y-4 px-4">
      <h1 className="text-center text-black font-extrabold py-8 md:py-14 text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
        PORTFOLIO
      </h1>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 max-w-4xl w-full -mt-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-6 w-full">
          {getCurrentItems().map((item) => (
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
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="mt-3 text-start ml-6 max-w-[300px] flex-wrap w-full">
                <h3 className="text-[18px] md:text-base font-semibold text-gray-800 group-hover:text-black transition-colors duration-200">
                  {item.title.toUpperCase()}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {getCurrentItems().length === 0 && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">No items to display</p>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default Page;

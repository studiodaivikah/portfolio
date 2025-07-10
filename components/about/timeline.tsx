import React from "react";

export default function Timeline() {
  const timelineData = [
    {
      id: 1,
      date: "2022",
      title: "Founding of Studio Daivikah",
      description:
        "Studio Daivikah is the vision of a passionate architect driven by the belief that great design goes beyond beauty - it must serve,inspire.",
      type: "milestone",
      image: "/images/abt1.jpg",
    },
    {
      id: 2,
      date: "2025",
      title: "Design Phase Complete",
      description:
        "Welcome to a New Chapter in Living — Our First Residential Project in Madhavaram We are proud to introduce our very first residential venture in Madhavaram — a thoughtfully crafted community where comfort, connectivity, and contemporary design come together seamlessly. This milestone project marks the beginning of a vision to redefine urban living in one of Chennai’s most rapidly growing neighborhoods. Set amidst the calm yet well-connected streets of Madhavaram, the project offers the perfect balance of peaceful residential charm and urban accessibility. Every home is designed to reflect our core values — functionality, elegance, and enduring quality — while catering to the evolving lifestyles of modern families.",
      type: "completion",
      image:
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop",
    },
    {
      id: 3,
      date: "2025",
      title: "Expanding to Commercial Design",
      description:
        "Studio Daivikah expanded its services into commercial design,taking an office building and retail spaces.",
      type: "milestone",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    },
  ];

  return (
    <div className="w-full max-w-[1240px] mx-auto p-4 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-800">
        Project Timeline
      </h1>

      <div className="relative">
        {/* Timeline line - right side on mobile, center on desktop */}
        <div className="absolute right-4 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-[1px] bg-black"></div>

        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={item.id}
              className={`relative flex items-center mb-12 md:mb-20 ${
                // Mobile: always left-aligned, Desktop: alternating starting from left
                isLeft ? "flex-row" : "flex-row md:flex-row-reverse"
              }`}
            >
              {/* Content container */}
              <div
                className={`w-full md:w-1/2 ${
                  // Mobile: padding right to avoid timeline, Desktop: conditional padding
                  isLeft ? "pr-12 md:pr-4" : "pr-12 md:pl-4"
                }`}
              >
                <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 border border-gray-200">
                  {/* Mobile layout - always same structure */}
                  <div className="block md:hidden">
                    <div className="mb-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="mb-3">
                      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      {item.description}
                    </p>
                    {/* <div>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          item.type === "milestone"
                            ? "bg-blue-100 text-blue-800"
                            : item.type === "completion"
                            ? "bg-green-100 text-green-800"
                            : item.type === "testing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div> */}
                  </div>

                  {/* Desktop layout - alternating structure */}
                  <div className="hidden md:block">
                    {isLeft ? (
                      <>
                        <div className="mb-6">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-[500px] h-[300px] object-cover rounded-lg mx-auto"
                          />
                        </div>
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {/* {new Date(item.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })} */}
                            {item.date}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-3">
                          {item.description}
                        </p>
                        {/* <div>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              item.type === "milestone"
                                ? "bg-blue-100 text-blue-800"
                                : item.type === "completion"
                                ? "bg-green-100 text-green-800"
                                : item.type === "testing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.type}
                          </span>
                        </div> */}
                      </>
                    ) : (
                      <>
                        <div className="mb-3">
                          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {/* {new Date(item.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })} */}
                            {item.date}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-3">
                          {item.description}
                        </p>
                        {/* <div className="mb-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              item.type === "milestone"
                                ? "bg-blue-100 text-blue-800"
                                : item.type === "completion"
                                ? "bg-green-100 text-green-800"
                                : item.type === "testing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item.type}
                          </span>
                        </div> */}
                        <div>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-[500px] h-[300px] object-cover rounded-lg mx-auto"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Timeline dot */}
              <div
                className={`absolute right-[16px] md:relative md:right-2 z-10 bg-black size-4 rounded-full flex-shrink-0 transform translate-x-1/2 md:transform-none`}
              ></div>

              {/* Empty space for desktop layout */}
              <div className="hidden md:block md:w-1/2"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

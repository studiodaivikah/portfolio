"use client";

import React from "react";
import { useState, useEffect } from "react";

type GalleryImage = {
  id: string;
  image: string;
  createdAt: string;
};

const Team = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const fetchImages = async () => {
    try {
      const response = await fetch("/api/team");
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();
      setImages(data.images || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <main className="max-w-[1240px] my-24 w-full flex-start flex-col gap-y-3">
      <h1 className="text-[70px] md:text-[120px] lg:text-[140px] font-bold text-black">
        TEAM
      </h1>
      <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-6 w-full">
        {images.map((item) => (
          <div key={item.id} className="relative overflow-hidden shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={"img"}
              className="w-full h-72 md:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Team;

import React from "react";
import Image from "next/image";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/nav/navbar";

const all_news = [
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

const page = () => {
  return (
    <section className="flex-center w-full flex-col gap-y-6">
      <Navbar />
      <h1 className="text-center text-black font-extrabold py-8 md:py-14 text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
        NEWS
      </h1>
      <div className="max-w-7xl w-full my-14 px-4 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-6 w-full">
          {all_news.map((item) => (
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
              <div className="mt-8 text-start max-w-[300px] flex-wrap">
                <h3 className="text-[18px] md:text-base pl-6 font-semibold text-gray-800 group-hover:text-black transition-colors duration-200">
                  {item.title.toUpperCase()}
                </h3>
              </div>
              <div className="max-w-[300px] w-auto mt-1 h-10 ml-6 flex-between">
                <p className="flex-center text-[12px] font-normal text-black border border-gray-300 rounded-full px-4 py-1">
                  NEWS
                </p>
                <div className="flex-center gap-2">
                  <Image
                    height={16}
                    width={16}
                    alt="calendar"
                    src={"/icons/calendar.svg"}
                  />
                  <p className="text-[12px] font-normal text-black">
                    MAY 20, 2025
                  </p>
                </div>
                <div className="flex-center gap-2">
                  <Image
                    height={16}
                    width={16}
                    alt="share"
                    src={"/icons/share.svg"}
                  />
                  <p className="text-[12px] font-normal text-black">SHARE</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default page;

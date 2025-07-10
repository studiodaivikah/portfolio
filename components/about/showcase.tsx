import React from "react";

const ALL = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=400&fit=crop",
  },
];

const Showcase = () => {
  return (
    <main className="max-w-[1240px] my-24 w-full px-10 flex-start flex-col gap-y-5">
      <div className="flex-start flex-col">
        <h1 className="text-[40px] sm:text-[90px] md:text-[120px] lg:text-[140px] font-bold text-black">
          SHOWCASE
        </h1>
        <p className="text-[24px] text-black font-normal">
          Architecting Dreams, Building Reality.
        </p>
      </div>
      <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-6 w-full">
        {ALL.map((item) => (
          <div key={item.id} className="relative overflow-hidden shadow-lg">
            <img
              src={item.image}
              alt={"img"}
              className="w-full h-72 md:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Showcase;

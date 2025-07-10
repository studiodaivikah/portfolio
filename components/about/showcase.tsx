import React from "react";

const showcase_images = [
  { id: 1, src: "" },
  { id: 2, src: "" },
  { id: 3, src: "" },
  { id: 4, src: "" },
  { id: 5, src: "" },
  { id: 6, src: "" },
];

const Showcase = () => {
  return (
    <main className="max-w-[1240px] w-full px-10 flex-start flex-col gap-y-5">
      <div className="flex-start flex-col">
        <h1 className="text-[140px] font-bold text-black">SHOWCASE</h1>
        <p className="text-[24px] text-black font-normal">
          Architecting Dreams, Building Reality.
        </p>
      </div>
      <div className="w-full grid grid-cols-3 mt-8 gap-y-6">
        {showcase_images.map((v) => <div key={v.id} className="size-[360px] border border-slate-400"></div>)}
      </div>
    </main>
  );
};

export default Showcase;

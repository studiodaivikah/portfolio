import React from "react";
import { useState } from "react";
import PortfolioManager from "./portfolio/adminportfolio";

const News = () => {
  return <main>news</main>;
};

const Admin = () => {
  const [currentpage, setCurrentpage] = useState("");
  return (
    <main className="flex flex-col items-center max-w-[2500px] w-full">
      <main className="flex-center bg-black h-[66px] mx-auto max-w-[2800px] gap-5 w-full">
        <div className="max-w-[1240px] flex-between w-full px-10">
          <p className="text-[20px] font-normal text-white">Admin Panel</p>
          <div className="flex-center gap-5">
            <button
              onClick={() => setCurrentpage("portfolio")}
              className="text-[16px] font-normal px-4 py-2 cursor-pointer border border-slate-300 rounded-full text-white"
            >
              Edit Portfolio
            </button>
            <button
              onClick={() => setCurrentpage("news")}
              className="text-[16px] border cursor-pointer border-slate-300 rounded-full px-4 py-2 font-normal text-white"
            >
              Edit News
            </button>
          </div>
        </div>
      </main>
      <main className="border">
        {currentpage === "portfolio" ? (
          <PortfolioManager />
        ) : currentpage === "news" ? (
          <News />
        ) : (
          <>Click on portfolio or news</>
        )}
      </main>
    </main>
  );
};

export default Admin;

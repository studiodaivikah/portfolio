import React from "react";
import { useState } from "react";
import PortfolioManager from "./portfolio/adminportfolio";
import AdminNews from "./news/adminnews";

const Admin = () => {
  const [currentpage, setCurrentpage] = useState("");
  return (
    <main className="flex flex-col items-center max-w-[2500px] w-full">
      <main className="flex-center bg-black h-[80px] sm:h-[66px] mx-auto gap-5 w-full">
        <div className="max-w-[1140px] flex-between w-full px-4 sm:px-10">
          <p className="text-[14px] sm:text-[20px] font-normal text-white">
            Admin Panel
          </p>
          <div className="flex-center gap-5">
            <button
              onClick={() => setCurrentpage("portfolio")}
              className="text-[10px] sm:text-[14px] font-normal px-4 py-2 cursor-pointer border border-slate-300 rounded-full text-white"
            >
              Edit Portfolio
            </button>
            <button
              onClick={() => setCurrentpage("news")}
              className="text-[10px] sm:text-[14px] border cursor-pointer border-slate-300 rounded-full px-4 py-2 font-normal text-white"
            >
              Edit News
            </button>
          </div>
        </div>
      </main>
      <main className="max-w-[1180px] px-2 sm:px-10 my-4 w-full flex-center">
        {currentpage === "portfolio" ? (
          <PortfolioManager />
        ) : currentpage === "news" ? (
          <AdminNews />
        ) : (
          <main className="flex-center w-full max-w-[1140px] h-screen">
            <p className="text-[20px] text-gray-500 font-normal">
              Click on portfolio or news
            </p>
          </main>
        )}
      </main>
    </main>
  );
};

export default Admin;

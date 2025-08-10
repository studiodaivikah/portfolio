"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/nav/navbar";

type NewsItem = {
  id: string;
  src: string;
  title: string;
  image: string;
  createdAt: string;
};

const NewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNews(data.news);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleShare = async (newsUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(newsUrl);
      setShowToast(true);

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = newsUrl;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } catch (fallbackError) {
        console.error("Fallback copy failed:", fallbackError);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <section className="flex-center pt-24 w-full flex-col gap-y-6">
      <Navbar />
      <h1 className="text-center text-black font-extrabold py-8 md:py-14 text-4xl md:text-6xl lg:text-7xl xl:text-8xl">
        NEWS
      </h1>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 z-50 bg-black text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Link copied to clipboard!
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center my-20">
          <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-7xl w-full my-14 px-4 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-6 w-full">
            {news.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                <a
                  href={item.src}
                  target="_blank"
                  className="relative overflow-hidden rounded-lg shadow-lg"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                </a>
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
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div
                    className="flex-center gap-2 cursor-pointer hover:opacity-70 transition-opacity duration-200"
                    onClick={(e) => handleShare(item.src, e)}
                  >
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
      )}
      <Footer />
    </section>
  );
};

export default NewsPage;

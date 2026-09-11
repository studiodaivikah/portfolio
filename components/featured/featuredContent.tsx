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

const NewsContent = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news");
        if (response.ok) {
          const data = await response.json();
          setNews(Array.isArray(data?.news) ? data.news : []);
        } else {
          setNews([]);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setNews([]);
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
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  return (
    <div className="w-full bg-white flex flex-col items-center pt-20">
      <Navbar />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-5 z-50 bg-black text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-sm font-medium">Link copied to clipboard!</span>
        </div>
      )}

      {/* Main Title */}
      <h1 className="text-center font-extrabold text-[50px] sm:text-[90px] md:text-[120px] lg:text-[140px] text-black tracking-tight my-10">
        NEWS
      </h1>

      {/* Subtitle */}
      <div className="max-w-[760px] text-center px-5 mb-16">
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
          Stay updated with the latest press features, media coverage, and
          industry updates from Studio Daivikah. Discover our latest
          architectural milestones and achievements.
        </p>
      </div>

      {/* News Grid */}
      <div className="w-full max-w-[1240px] px-5 sm:px-10 mb-24">
        {loading ? (
          <div className="flex justify-center items-center my-20">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : !news || !Array.isArray(news) || news.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">No items to display</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <a
                key={item.id}
                href={item.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative w-full h-[260px] overflow-hidden bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-black transition-colors line-clamp-3 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>

                    <button
                      onClick={(e) => handleShare(item.src, e)}
                      className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-black transition-colors"
                      title="Share link"
                    >
                      <Image
                        height={18}
                        width={18}
                        alt="share"
                        src="/icons/share.svg"
                      />
                    </button>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default NewsContent;

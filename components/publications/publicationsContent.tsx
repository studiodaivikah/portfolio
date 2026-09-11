"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/nav/navbar";

type PublicationItem = {
  id: string;
  title: string;
  description: string;
  link: string;
  image?: string | null;
  createdAt: string;
};

const PublicationsContent = () => {
  const [publications, setPublications] = useState<PublicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch("/api/publications");
        if (response.ok) {
          const data = await response.json();
          setPublications(Array.isArray(data?.publications) ? data.publications : []);
        } else {
          setPublications([]);
        }
      } catch (error) {
        console.error("Failed to fetch publications:", error);
        setPublications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPublications();
  }, []);

  const handleShare = async (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(url);
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
      <h1 className="text-center font-extrabold text-[45px] sm:text-[80px] md:text-[110px] lg:text-[130px] text-black tracking-tight my-10">
        PUBLICATIONS
      </h1>

      {/* Subtitle */}
      <div className="max-w-[760px] text-center px-5 mb-16">
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
          Explore external publication features, articles, press mentions, and published works highlighting Studio Daivikah.
        </p>
      </div>

      {/* Publications Grid */}
      <div className="w-full max-w-[1240px] px-5 sm:px-10 mb-24">
        {loading ? (
          <div className="flex justify-center items-center my-20">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : !publications || publications.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 text-lg">No publications available to display</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {publications.map((pub) => (
              <a
                key={pub.id}
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200/80 flex flex-col h-full cursor-pointer"
              >
                {pub.image && (
                  <div className="relative w-full h-[240px] overflow-hidden bg-gray-100">
                    <Image
                      src={pub.image}
                      alt={pub.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                )}

                <div className="p-7 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-black transition-colors line-clamp-2 leading-snug mb-3">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed font-normal">
                      {pub.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium flex items-center gap-1 group-hover:text-black transition-colors">
                      Read Publication &rarr;
                    </span>

                    <button
                      onClick={(e) => handleShare(pub.link, e)}
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

export default PublicationsContent;

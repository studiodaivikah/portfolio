import Footer from "@/components/footer/footer";
import MainFooter from "@/components/footer/mainfooter";
import Timeline from "@/components/about/timeline";
import React from "react";
import Image from "next/image";
import Showcase from "@/components/about/showcase";
import Navbar from "@/components/nav/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Architecture & Design Philosophy",
  description:
    "Learn about Studio Daivikah — an architectural practice driven by thoughtful craftsmanship, contextual relevance, and the belief that great design must serve and inspire.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Architecture & Design Philosophy | Studio Daivikah",
    description:
      "Learn about Studio Daivikah — an architectural practice driven by thoughtful craftsmanship, contextual relevance, and the belief that great design must serve and inspire.",
    url: "https://studiodaivikah.com/about",
  },
};

const page = () => {
  return (
    <section className="w-full pt-20 flex-col flex-center">
      <Navbar />
      <div className="relative w-full flex-center py-28 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-[500px] w-full object-cover absolute opacity-50"
          src={"/images/abt_main.jpg"}
          alt="pic1"
        />
        <h1 className="text-center z-50 text-black font-extrabold text-[50px] sm:text-[90px] md:text-[120px] lg:text-[140px]">
          ABOUT
        </h1>
      </div>
      <div className="flex flex-col my-16 md:my-32 md:flex-row md:justify-between max-w-[1240px] w-full px-5 sm:px-10 gap-8">
        <div className="flex-start flex-col gap-y-3">
          <p className="text-[24px] text-black font-medium">Studio Daivikah</p>
          <p className="text-[18px] sm:ml-20 lg:ml-36 text-black font-normal italic">
            &quot;Concept to Creation&quot;
          </p>
          <p className="text-[16px] sm:text-[18px] max-w-[600px] w-full text-black font-normal leading-relaxed">
            Studio Daivikah is the vision of a passionate architect driven by
            the belief that great design goes beyond beauty—it must serve,
            inspire, and endure. Founded on the core values of thoughtful
            craftsmanship and contextual relevance, the studio is a space where
            creativity and functionality come together in perfect harmony. With
            a keen eye for detail and a deep respect for materials, Studio
            Daivikah creates architectural and interior spaces that are
            timeless, intuitive, and rooted in purpose. Every project is
            approached as a unique narrative—carefully shaped to reflect the
            lifestyle, aspirations, and emotions of those who inhabit it.
            Whether it’s a serene home, a vibrant workspace, or a soulful
            retreat, Studio Daivikah strives to craft environments that not only
            look beautiful but feel deeply connected to the people who use them.
          </p>
        </div>
        <div className="relative w-full h-[300px] sm:h-[400px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-lg overflow-hidden flex-shrink-0">
          <Image alt="pic1" src={"/images/abt_sub.jpg"} fill className="object-cover" />
        </div>
      </div>
      <Timeline />
      <Showcase />
      <MainFooter />
      <Footer />
    </section>
  );
};

export default page;

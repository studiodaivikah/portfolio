import Footer from "@/components/footer/footer";
import MainFooter from "@/components/footer/mainfooter";
import Timeline from "@/components/about/timeline";
import React from "react";
import Image from "next/image";
import Showcase from "@/components/about/showcase";

const page = () => {
  return (
    <section className="w-full flex-col flex-center">
      <div className="w-full flex-center py-28">
        <img
          className="h-[500px] w-screen absolute opacity-50"
          src={"/images/abt_main.jpg"}
          alt="pic1"
        />
        <p className="text-center z-50 text-black font-extrabold text-[80px] md:text-[120px] lg:text-[140px]">
          ABOUT
        </p>
      </div>
      <div className="flex flex-col my-32 md:flex-row md:justify-between max-w-[1240px] w-full px-10">
        <div className="flex-start flex-col gap-y-3">
          <p className="text-[24px] text-black font-medium">Studio Daivikah</p>
          <p className="text-[18px] ml-24 sm:ml-32 lg:ml-36 text-black font-normal">
            &quot;Concept to Creation&quot;
          </p>
          <p className="text-[18px] max-w-[600px] w-full text-black font-normal">
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
        <div className="relative md:size-[400px] lg:size-[500px] aspect-square">
          <Image alt="pic1" src={"/images/abt_sub.jpg"} fill />
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

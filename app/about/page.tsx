import Footer from "@/components/footer/footer";
import MainFooter from "@/components/footer/mainfooter";
import Timeline from "@/components/about/timeline";
import React from "react";
import Image from "next/image";
import Showcase from "@/components/about/showcase";

const page = () => {
  return (
    <section className="w-full flex-col flex-center">
      <div className="w-full flex-center border-b border-b-black py-40">
        <p className="text-center text-black font-extrabold text-[80px] md:text-[120px] lg:text-[140px]">
          ABOUT
        </p>
      </div>
      <div className="flex flex-col my-24 md:flex-row md:justify-between max-w-[1240px] w-full px-10">
        <div className="flex-start flex-col gap-y-3">
          <p className="text-[24px] text-black font-medium">Studio Daivikah</p>
          <p className="text-[18px] ml-24 sm:ml-32 lg:ml-36 text-black font-normal">
            &quot;Concept to Creation&quot;
          </p>
          <p className="text-[18px] max-w-[600px] w-full text-black font-normal">
            Studio Daivikah has the platform for engaging in diverse
            architecture projects including residential, commercial and interior
            design, from concept to execution collaboration with
            interdisciplinary teams has enabled innovative and sustainable
            project delivery, emphasing, design excellence and functionality.
          </p>
        </div>
        <div className="relative md:size-[400px] lg:size-[500px] aspect-square">
          <Image alt="pic1" src={"/images/abt_pic_1.jpg"} fill />
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

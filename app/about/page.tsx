import Footer from "@/components/footer/footer";
import MainFooter from "@/components/footer/mainfooter";
import Timeline from "@/components/ui/timeline";
import React from "react";

const page = () => {
  return (
    <section className="w-full flex-col flex-center gap-y-24">
      <div className="w-full flex-center border-b border-b-black py-40">
        <p className="text-center text-black font-extrabold text-[80px] md:text-[120px] lg:text-[140px]">
          ABOUT
        </p>
      </div>
      <div className="flex-start flex-col border max-w-[1140px] gap-y-4 w-full">
        <p className="text-[24px] text-black font-medium">Studio Daivikah</p>
        <p className="text-[18px] max-w-[600px] w-full text-black font-normal">
          Studio Daivikah has the platform for engaging in diverse architecture
          projects including residential, commercial and interior design, from
          concept to execution collaboration with interdisciplinary teams has
          enabled innovative and sustainable project delivery, emphasing, design
          excellence and functionality
        </p>
      </div>
      <Timeline />
      <MainFooter />
      <Footer />
    </section>
  );
};

export default page;

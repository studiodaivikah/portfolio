import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="absolute flex items-start px-5 sm:px-8 justify-start flex-col top-36 gap-y-10 lg:justify-between h-auto max-w-[1200px] w-full">
      <h1 className="text-[20px] text-gray-300 -mb-6 font-normal">
        STRUCTURAL ART
      </h1>
      <h2 className="text-white text-[36px] xs:text-[40px] sm:text-[52px] md:text-[60px] font-extrabold leading-12 sm:leading-16">
        DESIGNING SPACES THAT INSPIRE, <br />
        ENDURE, AND SHAPE TOMORROW
      </h2>
      <h3 className="text-white text-[20px] font-normal max-w-[760px] leading-7 w-full text-wrap">
        Welcome to the world of architecture — where imagination takes shape in
        steel and stone, where creativity meets functionality, and where every
        line drawn is a step toward turning dreams into structures. Here, each
        design tells a unique story — of people, place, purpose, and
        possibility.
      </h3>
      <div className="flex justify-between flex-col gap-6 w-full">
        <div>
          <button className="text-white font-normal text-[16px] border border-white py-3 px-10">
            Explore Us
          </button>
        </div>
        <div className="flex justify-end gap-3">
          <div className="flex-center gap-3">
            <p className="text-white text-sm font-normal">FOLLOW US</p>
            <div className="border border-white p-1.5 rounded-full">
              <Image
                height={16}
                width={16}
                alt="linkedin"
                src={"/icons/linkedin_filled.svg"}
              />
            </div>
            <div className="border border-white p-1.5 rounded-full">
              <Image
                height={16}
                width={16}
                alt="instagram"
                src={"/icons/instagram_filled.svg"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

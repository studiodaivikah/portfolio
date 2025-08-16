import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="absolute flex items-start px-5 sm:px-8 justify-start flex-col top-28 gap-y-[96px] lg:justify-between h-auto max-w-[1200px] w-full">
      {/* <h1 className="text-[20px] text-gray-300 -mb-6 font-normal">
        STRUCTURAL ART
      </h1> */}
      <h2 className="text-white text-[36px] xs:text-[40px] sm:text-[52px] md:text-[60px] font-extrabold leading-12 sm:leading-16">
        DESIGNING SPACES THAT, <br />
        INSPIRE ENDURE, <br />
         AND SHAPE TOMORROW
      </h2>
      <h3 className="text-white text-[20px] font-normal max-w-[760px] leading-7 w-full text-wrap">
        &quot;Welcome to the world of architecture — where imagination takes
        shape in steel and stone, where creativity meets functionality, and
        where every line drawn is a step toward turning dreams into structures.
        Here, each design tells a unique story — of people, place, purpose, and
        possibility.&quot;
      </h3>
      <div className="flex justify-between flex-row items-center mt-20 gap-6 w-full">
        <div>
          <button className="text-white font-normal text-[16px] border border-white py-3 px-10">
            Explore Us
          </button>
        </div>
        <div className="flex justify-end gap-3">
          <div className="flex-center gap-3">
            <p className="text-white text-sm font-normal">FOLLOW US</p>
            <a
              target="_blank"
              href={"https://www.linkedin.com/company/studio-daivikah/"}
              rel="noopener noreferrer"
              className="border border-white p-1.5 rounded-full"
            >
              <Image
                height={16}
                width={16}
                alt="linkedin"
                src={"/icons/linkedin_filled.svg"}
              />
            </a>
            <a
              target="_blank"
              href={
                "https://www.instagram.com/studio.daivikah?igsh=NHFnbjJ2cmpxYXRh&utm_source=qr"
              }
              rel="noopener noreferrer"
              className="border border-white p-1.5 rounded-full"
            >
              <Image
                height={16}
                width={16}
                alt="instagram"
                src={"/icons/instagram_filled.svg"}
              />
            </a>
            <a
              href="https://wa.me/917550237036?text=Hello%20Studio%20Daivikah"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white p-1.5 rounded-full"
            >
              <Image
                height={16}
                width={16}
                alt="whatsapp"
                src={"/icons/whatsapp_filled.svg"}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

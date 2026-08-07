import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative z-10 flex items-start px-5 sm:px-8 md:px-12 justify-center flex-col gap-y-5 sm:gap-y-8 lg:gap-y-10 max-w-[1240px] w-full py-8 sm:py-12">
      <h2 className="text-white text-[24px] sm:text-[42px] md:text-[54px] lg:text-[62px] font-extrabold leading-tight tracking-tight drop-shadow-md">
        DESIGNING SPACES THAT, <br className="hidden sm:inline" />
        INSPIRE ENDURE, <br className="hidden sm:inline" />
        AND SHAPE TOMORROW
      </h2>
      <h3 className="text-gray-100 text-[14px] sm:text-[17px] md:text-[19px] font-normal max-w-[760px] leading-relaxed w-full drop-shadow">
        &quot;Welcome to the world of architecture — where imagination takes
        shape in steel and stone, where creativity meets functionality, and
        where every line drawn is a step toward turning dreams into structures.
        Here, each design tells a unique story — of people, place, purpose, and
        possibility.&quot;
      </h3>
      <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center mt-2 sm:mt-6 gap-5 w-full">
        <div>
          <Link
            href="/portfolio"
            className="inline-block bg-white text-black font-semibold text-[13px] sm:text-[15px] py-3 px-8 hover:bg-gray-200 transition-all duration-300 rounded-full shadow-lg"
          >
            Explore Us
          </Link>
        </div>
        <div className="flex justify-end gap-3">
          <div className="flex items-center gap-3">
            <p className="text-white text-xs sm:text-sm font-medium tracking-wider">FOLLOW US</p>
            <a
              target="_blank"
              href={"https://www.linkedin.com/company/studio-daivikah/"}
              rel="noopener noreferrer"
              className="bg-white/15 backdrop-blur-md border border-white/40 p-2 rounded-full hover:bg-white/30 transition-all duration-300"
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
              className="bg-white/15 backdrop-blur-md border border-white/40 p-2 rounded-full hover:bg-white/30 transition-all duration-300"
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
              className="bg-white/15 backdrop-blur-md border border-white/40 p-2 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <Image
                height={16}
                width={16}
                alt="whatsapp"
                src={"/icons/whatsapp_filled.svg"}
              />
            </a>
            <a
              href="https://www.facebook.com/share/15spjwC4w9/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/15 backdrop-blur-md border border-white/40 p-2 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <Image
                height={16}
                width={16}
                alt="facebook"
                src={"/icons/facebook_filled.svg"}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

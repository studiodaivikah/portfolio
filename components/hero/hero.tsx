import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="absolute flex items-start px-5 sm:px-8 justify-start flex-col top-20 sm:top-28 gap-y-6 sm:gap-y-10 lg:gap-y-14 h-auto max-w-[1200px] w-full">
      <h2 className="text-white text-[26px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-extrabold leading-tight">
        DESIGNING SPACES THAT, <br />
        INSPIRE ENDURE, <br />
        AND SHAPE TOMORROW
      </h2>
      <h3 className="text-white text-[15px] sm:text-[18px] md:text-[20px] font-normal max-w-[760px] leading-relaxed w-full">
        &quot;Welcome to the world of architecture — where imagination takes
        shape in steel and stone, where creativity meets functionality, and
        where every line drawn is a step toward turning dreams into structures.
        Here, each design tells a unique story — of people, place, purpose, and
        possibility.&quot;
      </h3>
      <div className="flex justify-between flex-col sm:flex-row items-start sm:items-center mt-4 sm:mt-6 gap-6 w-full">
        <div>
          <Link
            href="/portfolio"
            className="inline-block text-white font-medium text-[14px] sm:text-[16px] border border-white py-3 px-8 hover:bg-white hover:text-black transition-colors duration-300 rounded-sm"
          >
            Explore Us
          </Link>
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
            <a
              href="https://www.facebook.com/share/15spjwC4w9/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white p-1.5 rounded-full"
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

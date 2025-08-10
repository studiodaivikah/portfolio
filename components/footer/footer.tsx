import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <main className="w-full flex-center px-2 border-t border-t-gray-300/50 gap-1 sm:gap-3 bg-white h-12 py-8">
      <Image
        height={12}
        width={12}
        alt="copyright"
        src={"/icons/copyright.svg"}
      />
      <p className="font-noraml text-center text-wrap text-[10px] sm:text-[12px] tracking-[3px] text-black">
        STUDIO DAIVIKAH. ALL RIGHTS RESERVED
      </p>
    </main>
  );
};

export default Footer;

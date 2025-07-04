import Image from "next/image";
import React from "react";

const navitems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "/about" },
  { name: "SERVICES", href: "/services" },
  { name: "PORTFOLIO", href: "/portfolio" },
  { name: "NEWS", href: "/news" },
  { name: "CONTACT", href: "/contact" },
];

const Navbar = () => {
  return (
    <section className="w-full h-[80px] flex-center mx-auto">
      <div className="flex items-center justify-start mx-5 sm:mx-8 gap-6 lg:gap-0 lg:justify-between h-full max-w-[1140px] w-full">
        <Image
          className="block lg:hidden"
          height={24}
          width={24}
          alt="menu"
          src={"/icons/menu.svg"}
        />
        <div>LOGO</div>
        <nav className="lg:flex gap-6 hidden">
          {navitems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-700 text-[13px] font-normal"
            >
              {item.name}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center justify-center gap-1.5">
          <Image
            height={24}
            width={24}
            alt="linkedin"
            src={"/icons/linkedin.svg"}
          />
          <Image
            height={24}
            width={24}
            alt="instagram"
            src={"/icons/instagram.svg"}
          />
        </div>
      </div>
    </section>
  );
};

export default Navbar;

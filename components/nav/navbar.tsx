import Image from "next/image";
import Link from "next/link";
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
    <section className="w-full h-[80px] top-0 fixed z-50 bg-gray-950 flex-center mx-auto">
      <div className="flex items-center justify-start mx-5 sm:mx-8 gap-6 lg:gap-0 lg:justify-between h-full max-w-[1140px] w-full">
        <Image
          className="block lg:hidden"
          height={24}
          width={24}
          alt="menu"
          src={"/icons/menu.svg"}
        />
        <p className="text-white">LOGO</p>
        <nav className="lg:flex gap-6 hidden">
          {navitems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white text-[13px] font-normal"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center justify-center gap-1.5">
          <a
            target="_blank"
            href={"https://www.linkedin.com/company/studio-daivikah/"}
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <Image
              height={24}
              width={24}
              alt="linkedin"
              src={"/icons/linkedin.svg"}
            />
          </a>
          <a
            target="_blank"
            href={
              "https://www.instagram.com/studio.daivikah?igsh=NHFnbjJ2cmpxYXRh&utm_source=qr"
            }
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <Image
              height={24}
              width={24}
              alt="instagram"
              src={"/icons/instagram.svg"}
            />
          </a>
          <a
            href="https://wa.me/917550237036?text=Hello%20Studio%20Daivikah"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            <Image
              height={24}
              width={24}
              alt="whatsapp"
              src="/icons/whatsapp.svg"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Navbar;

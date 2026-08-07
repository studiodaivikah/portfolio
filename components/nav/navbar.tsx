"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const navitems = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "/about" },
  { name: "SERVICES", href: "/services" },
  { name: "PORTFOLIO", href: "/portfolio" },
  { name: "BLOG", href: "/blog" },
  { name: "NEWS", href: "/news" },
  { name: "CONTACT", href: "/contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full h-[80px] z-50 bg-gray-950 flex-center">
        <div className="flex items-center justify-between px-5 sm:px-8 h-full max-w-[1140px] w-full mx-auto">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="block lg:hidden p-2 -ml-2"
            aria-label="Toggle mobile menu"
          >
            <Image
              height={24}
              width={24}
              alt="menu"
              src={isMobileMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
            />
          </button>

          {/* Logo */}
          <Image src={"/images/logo.png"} height={70} width={70} alt="logo"/>

          {/* Desktop Navigation */}
          <nav className="lg:flex gap-6 hidden">
            {navitems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white text-[13px] font-normal hover:text-gray-300 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Social Icons */}
          <div className="hidden lg:flex items-center justify-center gap-1.5">
            <a
              target="_blank"
              href={"https://www.linkedin.com/company/studio-daivikah/"}
              rel="noopener noreferrer"
              className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
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
              className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
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
              className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
            >
              <Image
                height={24}
                width={24}
                alt="whatsapp"
                src="/icons/whatsapp.svg"
              />
            </a>
            <a
              href="https://www.facebook.com/share/15spjwC4w9/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
            >
              <Image
                height={24}
                width={24}
                alt="facebook"
                src="/icons/facebook.svg"
              />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed top-[80px] left-0 w-full bg-gray-950 transform transition-transform duration-300 ease-in-out z-40 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col py-6">
          {navitems.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeMobileMenu}
              className="text-white text-base font-normal px-6 py-4 hover:bg-gray-800 transition-colors duration-200 border-b border-gray-800 last:border-b-0"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: isMobileMenuOpen
                  ? "slideInRight 0.3s ease-out forwards"
                  : "none",
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Social Icons */}
        <div className="flex items-center justify-center gap-6 py-6 border-t border-gray-800">
          <a
            target="_blank"
            href={"https://www.linkedin.com/company/studio-daivikah/"}
            rel="noopener noreferrer"
            className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
          >
            <Image
              height={28}
              width={28}
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
            className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
          >
            <Image
              height={28}
              width={28}
              alt="instagram"
              src={"/icons/instagram.svg"}
            />
          </a>
          <a
            href="https://wa.me/917550237036?text=Hello%20Studio%20Daivikah"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
          >
            <Image
              height={28}
              width={28}
              alt="whatsapp"
              src="/icons/whatsapp.svg"
            />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;

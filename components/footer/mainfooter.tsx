import Link from "next/link";
import React from "react";

const f1_items = [
  { id: 1, label: "Linkedin", href: "/" },
  { id: 2, label: "Whatsapp", href: "/" },
  { id: 3, label: "Instagram", href: "/" },
];

const address = [
  { id: 2, label: "36, Surapet main road," },
  { id: 3, label: "Puthagaram" },
  { id: 4, label: "Chennai - 600099" },
  { id: 5, label: "Tamil Nadu" },
];

const projects = [
  { id: 2, label: "All Projects" },
  { id: 3, label: "Residential" },
  { id: 4, label: "Commercial" },
  { id: 5, label: "Freelance" },
  { id: 6, label: "Turnkey" },
  { id: 7, label: "Urbanism" },
];

const links = [
  { id: 2, href: "/", label: "Home" },
  { id: 3, href: "/", label: "Contact" },
  { id: 4, href: "/", label: "Our Services" },
  { id: 5, href: "/", label: "About Us" },
  { id: 6, href: "/", label: "Latest News" },
];

const MainFooter = () => {
  return (
    <section className="flex items-center flex-col gap-3 bg-black w-full py-10">
      <div className="max-w-[1100px] w-full bg-black flex flex-col gap-3 items-center px-10">
        <div className="flex-between w-full gap-4">
          <p className="text-white font-bold text-[24px]">LOGO</p>
          <div className="flex-between w-full max-w-[300px]">
            {f1_items.map((items) => (
              <Link
                href={items.href}
                key={items.id}
                className="text-[14px] sm:text-[16px] text-gray-300 font-normal"
              >
                {items.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full border border-gray-400/30 h-0.5" />
        <div className="grid grid-cols-2 gap-5 md:flex md:justify-between w-full mt-10">
          <div className="flex flex-col items-start gap-y-7">
            <div className="flex flex-col items-start gap-y-3">
              <p className="font-normal text-white text-[16px] mb-4">
                CONTACT US
              </p>
              <p className="font-normal text-white text-[14px]">Address</p>
              {address.map((item) => (
                <p
                  key={item.id}
                  className="text-gray-400 font-normal text-[14px]"
                >
                  {item.label}
                </p>
              ))}
            </div>
            <div className="flex flex-col items-start gap-y-3">
              <p className="font-normal text-white text-[14px]">Mail Us</p>
              <p className="font-normal text-gray-400 text-[14px]">
                studiodavikah@gmail.com
              </p>
            </div>
            <div className="flex flex-col items-start gap-y-3">
              <p className="font-normal text-white text-[14px]">Call Us</p>
              <p className="font-normal text-gray-400 text-[14px]">
                +91 75502 37036
              </p>
            </div>
            <div className="flex flex-col items-start gap-y-3">
              <p className="font-normal text-white text-[14px]">
                Working Hours
              </p>
              <p className="font-normal text-gray-400 text-[14px]">
                Monday - Friday
              </p>

              <p className="font-normal text-gray-400 text-[14px]">
                9.00 A.M - 5.00 P.M
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-y-7">
            <div className="flex flex-col items-start gap-y-3">
              <p className="font-normal text-white text-[16px] mb-4">
                OUR PROJECTS
              </p>
              {projects.map((item) => (
                <p
                  key={item.id}
                  className="text-gray-400 font-normal text-[14px]"
                >
                  {item.label}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-y-7">
            <div className="flex flex-col items-start gap-y-3">
              <p className="font-normal text-white text-[16px] mb-4">LINKS</p>
              {links.map((item) => (
                <Link
                  href={item.href}
                  key={item.id}
                  className="text-gray-400 font-normal text-[14px]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-y-2">
            <p className="font-normal text-white text-[16px] mb-4">
              MISSION & VISSION
            </p>
            <div className="flex flex-col items-start gap-y-3">
              <p className="font-normal text-white text-[14px]">MISSION</p>
              <p className="font-normal text-gray-400 text-[14px] max-w-[200px] w-full">
                Bringing visionary architecture to life for today&apos;s
                evolving lifestyles.
              </p>
            </div>
            <div className="flex flex-col items-start gap-y-3">
              <p className="font-normal text-white text-[14px]">VISION</p>
              <p className="font-normal text-gray-400 text-[14px] w-full max-w-[200px]">
                Where modern thinking meets classic roots to shape enduring
                design.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainFooter;

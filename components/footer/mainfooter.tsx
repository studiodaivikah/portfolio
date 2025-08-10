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
    <section className="flex items-center flex-col gap-3 bg-black w-full py-20">
      <div className="max-w-[1100px] w-full bg-black flex flex-col gap-3 items-center px-10">
        <div className="flex items-start flex-col sm:flex-row justify-start sm:items-center sm:justify-between w-full gap-4">
          <p className="text-white font-bold text-[24px]">LOGO</p>
          <div className="flex-between w-full max-w-[240px] sm:max-w-[300px]">
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
          {/* Contact Section */}
          <div className="flex flex-col items-start gap-y-7 order-1">
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

          {/* Projects Section */}
          <div className="flex flex-col items-start gap-y-7 order-2">
            <div className="flex flex-col items-start gap-y-3">
              <p className="font-normal text-white text-[16px] mb-4">
                OUR PROJECTS
              </p>
              {projects.map((item) => (
                <p
                  key={item.id}
                  className="text-gray-400 font-normal text-[14px] hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </p>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-start gap-y-7 order-3">
            <div className="flex flex-col items-start gap-y-3">
              <p className="font-normal text-white text-[16px] mb-4">LINKS</p>
              {links.map((item) => (
                <Link
                  href={item.href}
                  key={item.id}
                  className="text-gray-400 font-normal text-[14px] hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mission & Vision Section - Right on large screens */}
          <div className="flex flex-col items-start gap-y-2 order-4 md:order-4">
            <p className="font-normal text-white text-[16px] mb-4">
              MISSION & VISION
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

        {/* Map Section - Bottom right on large devices, last on mobile */}
        <div className="w-full mt-8 md:-mt-[200px] md:max-w-[500px] lg:max-w-[700px] md:ml-auto">
          <div className="w-full h-[250px] md:h-[200px] rounded-lg overflow-hidden border border-gray-600">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8267661251655!2d80.1879085!3d13.0446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f446a1c3187%3A0x2e7c8b4f3e7c8b4f!2sSurapet%20Main%20Rd%2C%20Puthagaram%2C%20Chennai%2C%20Tamil%20Nadu%20600099!5e0!3m2!1sen!2sin!4v1691234567890!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Studio Davikah Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainFooter;
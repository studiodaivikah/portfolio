import Link from "next/link";
import React from "react";
import Image from "next/image";

const f1_items = [
  { id: 1, label: "Linkedin", href: "https://www.linkedin.com/company/studio-daivikah/" },
  { id: 2, label: "Whatsapp", href: "https://wa.me/917550237036?text=Hello%20Studio%20Daivikah" },
  { id: 3, label: "Instagram", href: "https://www.instagram.com/studio.daivikah" },
];

const address = [
  { id: 2, label: "36, Surapet main road," },
  { id: 3, label: "Puthagaram" },
  { id: 4, label: "Chennai - 600099" },
  { id: 5, label: "Tamil Nadu" },
];

const projects = [
  { id: 2, label: "All Projects", href: "/portfolio" },
  { id: 3, label: "Architecture", href: "/portfolio" },
  { id: 4, label: "Interior Design", href: "/portfolio" },
  { id: 5, label: "Visualization", href: "/portfolio" },
  { id: 6, label: "Project Management", href: "/portfolio" },
  { id: 7, label: "Sustainability", href: "/portfolio" },
];

const links = [
  { id: 2, href: "/", label: "Home" },
  { id: 3, href: "/contact", label: "Contact" },
  { id: 4, href: "/services", label: "Our Services" },
  { id: 5, href: "/about", label: "About Us" },
  { id: 6, href: "/featured", label: "Featured" },
];

const MainFooter = () => {
  return (
    <section className="flex items-center flex-col gap-3 bg-black w-full py-14 sm:py-20">
      <div className="max-w-[1100px] w-full bg-black flex flex-col gap-8 items-center px-5 sm:px-10">
        <div className="flex items-start flex-col sm:flex-row justify-start sm:items-center sm:justify-between w-full gap-4">
          <Image src={"/images/logo.png"} height={70} width={70} alt="logo"/>
          <div className="flex items-center justify-between w-full max-w-[240px] sm:max-w-[300px]">
            {f1_items.map((items) => (
              <a
                href={items.href}
                key={items.id}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] sm:text-[16px] text-gray-300 hover:text-white font-normal transition-colors"
              >
                {items.label}
              </a>
            ))}
          </div>
        </div>
        <div className="w-full border border-gray-400/30 h-px" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {/* Contact Section */}
          <div className="flex flex-col items-start gap-y-4">
            <p className="font-semibold text-white text-[16px] mb-2">
              CONTACT US
            </p>
            <div className="flex flex-col items-start gap-y-1">
              <p className="font-medium text-white text-[14px]">Address</p>
              {address.map((item) => (
                <p
                  key={item.id}
                  className="text-gray-400 font-normal text-[14px]"
                >
                  {item.label}
                </p>
              ))}
            </div>
            <div className="flex flex-col items-start gap-y-1 mt-2">
              <p className="font-medium text-white text-[14px]">Mail Us</p>
              <p className="font-normal text-gray-400 text-[14px]">
                studiodavikah@gmail.com
              </p>
            </div>
            <div className="flex flex-col items-start gap-y-1 mt-2">
              <p className="font-medium text-white text-[14px]">Call Us</p>
              <p className="font-normal text-gray-400 text-[14px]">
                +91 75502 37036
              </p>
            </div>
          </div>

          {/* Projects Section */}
          <div className="flex flex-col items-start gap-y-4">
            <p className="font-semibold text-white text-[16px] mb-2">
              OUR PROJECTS
            </p>
            <div className="flex flex-col items-start gap-y-2">
              {projects.map((item) => (
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

          {/* Links Section */}
          <div className="flex flex-col items-start gap-y-4">
            <p className="font-semibold text-white text-[16px] mb-2">LINKS</p>
            <div className="flex flex-col items-start gap-y-2">
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

          {/* Mission & Vision Section */}
          <div className="flex flex-col items-start gap-y-4">
            <p className="font-semibold text-white text-[16px] mb-2">
              MISSION & VISION
            </p>
            <div className="flex flex-col items-start gap-y-1">
              <p className="font-medium text-white text-[14px]">MISSION</p>
              <p className="font-normal text-gray-400 text-[14px]">
                Bringing visionary architecture to life for today&apos;s
                evolving lifestyles.
              </p>
            </div>
            <div className="flex flex-col items-start gap-y-1 mt-2">
              <p className="font-medium text-white text-[14px]">VISION</p>
              <p className="font-normal text-gray-400 text-[14px]">
                Where modern thinking meets classic roots to shape enduring
                design.
              </p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="w-full mt-4">
          <div className="w-full h-[220px] sm:h-[260px] rounded-lg overflow-hidden border border-gray-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8267661251655!2d80.1879085!3d13.0446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f446a1c3187%3A0x2e7c8b4f3e7c8b4f!2sSurapet%20Main%20Rd%2C%20Puthagaram%2C%20Chennai%2C%20Tamil%20Nadu%20600099!5e0!3m2!1sen!2sin!4v1691234567890!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "grayscale(100%) invert(92%) contrast(83%)",
              }}
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

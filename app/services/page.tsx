"use client";

import Footer from "@/components/footer/footer";
import MainFooter from "@/components/footer/mainfooter";
import Navbar from "@/components/nav/navbar";
import Team from "@/components/services/Team";
import Image from "next/image";
import React, { useState } from "react";

type Service = {
  id: string;
  title: string;
  content: string;
};

const ServicesPage: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleExpansion = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const services: Service[] = [
    {
      id: "architectural-design",
      title: "Architectural Design",
      content:
        "Our architectural design services focus on creating innovative and functional spaces that reflect your vision. We combine creativity with technical expertise to deliver designs that are both aesthetically pleasing and structurally sound.",
    },
    {
      id: "3d-modeling",
      title: "3D Modeling & Visualization",
      content:
        "Transform your ideas into stunning visual representations with our advanced 3D modeling and visualization services. We create photorealistic renders that help you visualize your project before construction begins.",
    },
    {
      id: "interior-design",
      title: "Interior Design",
      content:
        "Our interior design services create harmonious and functional living spaces that reflect your personality and lifestyle. We focus on optimizing space utilization while maintaining aesthetic appeal.",
    },
    {
      id: "urban-planning",
      title: "Urban Planning",
      content:
        "We provide comprehensive urban planning solutions that consider environmental impact, community needs, and sustainable development practices to create livable and thriving urban spaces.",
    },
  ];

  const additionalServices: Service[] = [
    {
      id: "project-management",
      title: "Project Management",
      content:
        "Our project management services ensure your architectural projects are completed on time, within budget, and to the highest quality standards. We coordinate all aspects of construction and design implementation.",
    },
    {
      id: "interior-architecture",
      title: "Interior Architecture",
      content:
        "Specializing in the structural and spatial aspects of interior spaces, we create functional and beautiful environments that seamlessly integrate with the overall architectural design.",
    },
    {
      id: "3d-visualization",
      title: "3D Visualization",
      content:
        "Our cutting-edge 3D visualization services bring your architectural concepts to life with stunning detail and accuracy, helping stakeholders understand and approve design concepts.",
    },
  ];

  const designServices: Service[] = [
    {
      id: "design-excellence",
      title: "Design Excellence",
      content:
        "We are committed to delivering design excellence through innovative approaches, attention to detail, and a deep understanding of our clients' needs and aspirations.",
    },
    {
      id: "sustainable-architecture",
      title: "Sustainable Architecture",
      content:
        "Our sustainable architecture practices focus on creating environmentally responsible buildings that minimize energy consumption and reduce environmental impact while maintaining comfort and functionality.",
    },
    {
      id: "spatial-planning",
      title: "Spatial Planning",
      content:
        "Expert spatial planning services that optimize the use of available space, ensuring efficient flow, functionality, and aesthetic appeal in every project we undertake.",
    },
  ];

  type ServiceItemProps = {
    service: Service;
    className?: string;
  };

  const ServiceItem: React.FC<ServiceItemProps> = ({
    service,
    className = "",
  }) => {
    const isExpanded = expandedItems[service.id];

    return (
      <div className={`w-full ${className}`}>
        <div
          className="flex-between w-full cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
          onClick={() => toggleExpansion(service.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleExpansion(service.id);
            }
          }}
        >
          <p className="text-black text-[16px] sm:text-[24px] font-medium">{service.title}</p>
          <Image
            src={isExpanded ? "/icons/minus.svg" : "/icons/plus.svg"}
            height={20}
            width={20}
            alt={isExpanded ? "minus" : "plus"}
            className="transition-all duration-300 ease-in-out"
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-700 ease-in-out ${
            isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div
            className={`pt-4 pb-2 transition-all duration-300 ease-in-out ${
              isExpanded ? "translate-y-0" : "-translate-y-2"
            }`}
          >
            <p className="text-[16px] leading-6 font-normal text-gray-700">
              {service.content}
            </p>
          </div>
        </div>
        <div className="w-full h-px border border-gray-300/50 mt-4" />
      </div>
    );
  };

  return (
    <section className="w-full pt-20 flex-center flex-col">
      <Navbar />
      <div className="w-full flex-center border-b border-b-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/ser_main.jpg"
          alt="Services Hero"
          className="w-screen h-[300px] sm:h-[500px]"
        />
      </div>

      <div className="max-w-[1200px] w-full px-10 py-14 flex items-start justify-center flex-col">
        {/* Header Section */}
        <div className="flex flex-col items-start w-full justify-center gap-y-5">
          <div className="flex-between gap-2 w-full">
            <p className="text-[14px] sm:text-[16px] font-normal text-black">
              Design. Build. Inspire
            </p>
            <p className="text-[14px] sm:text-[16px] font-normal text-black">
              Shaping the Future Today
            </p>
          </div>

          <div className="flex-center">
            <p className="text-center text-black font-extrabold text-[40px] sm:text-[100px] md:text-[120px] lg:text-[140px]">
              SERVICES
            </p>
          </div>

          <div className="flex-center max-w-[700px] w-full">
            <p className="text-[24px] text-black font-normal leading-7">
              Delivering architectural services with innovation, precision, and
              creativity to design spaces that inspire, function seamlessly, and
              stand the test of time.
            </p>
          </div>
        </div>

        {/* First Services Section */}
        <div className="flex items-start sm:items-center justify-between sm:flex-row flex-col max-w-[1000px] w-full py-16 gap-8">
          <div className="flex flex-col items-start max-w-[500px] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ser_pic_1.jpg"
              alt="Studio Daivikah Services"
              className="h-[260px] w-full object-cover rounded-lg"
            />
            <p className="text-[24px] leading-8 mt-6 font-medium text-black">
              Studio Daivikah: Our practice is rooted in thoughtful design,
              meticulous planning, and an unwavering focus on our clients&apos;
              vision
            </p>
            <div className="border border-gray-400/50 w-full h-px mt-3" />
            <p className="text-[18px] leading-6 mt-6 font-normal text-gray-700">
              Welcome to Studio Daivikah —where innovation meets functionality.
              Our expert services include design, planning, and project
              management, crafting exceptional spaces that inspire, endure, and
              elevate your vision into reality.
            </p>
          </div>

          <div className="flex flex-col items-start max-w-[400px] w-full gap-y-4">
            {services.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Second Services Section */}
        <div className="flex items-start sm:items-center justify-between sm:flex-row flex-col max-w-[1000px] w-full py-16 gap-8">
          <div className="flex flex-col items-start max-w-[500px] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ser_pic_2.jpg"
              alt="Additional Services"
              className="h-[400px] w-full object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col items-start max-w-[400px] w-full gap-y-4">
            {additionalServices.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>
        </div>

        {/* Third Services Section */}
        <div className="flex items-start sm:items-center justify-between sm:flex-row flex-col max-w-[1000px] w-full py-16 gap-8">
          <div className="flex flex-col items-start max-w-[400px] w-full gap-y-4">
            <p className="text-black font-medium text-[26px] mb-4">
              Innovative Spaces. Timeless Designs.
            </p>
            {designServices.map((service) => (
              <ServiceItem key={service.id} service={service} />
            ))}
          </div>

          <div className="flex flex-col items-start max-w-[500px] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ser_pic_2.jpg"
              alt="Design Excellence"
              className="h-[400px] w-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="flex flex-col items-start w-full justify-center gap-y-5">
          <div className="flex-between w-full">
            <p className="text-[16px] font-normal text-black">
              Where Vision Meets Reality
            </p>
            <p className="text-[16px] font-normal text-black">
              Crafting Future Landmarks
            </p>
          </div>

          <Team />

          <div className="flex-center max-w-[700px] w-full">
            <p className="text-[24px] text-black font-normal leading-7">
              Studio Daivaikah welcomes you! Together, we build extraordinary
              spaces through imagination, precision, and a shared love for
              design.
            </p>
          </div>
        </div>
      </div>

      <MainFooter />
      <Footer />
    </section>
  );
};

export default ServicesPage;

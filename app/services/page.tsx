import Footer from "@/components/footer/footer";
import MainFooter from "@/components/footer/mainfooter";
import React from "react";

const page = () => {
  return (
    <section className="w-full flex-center flex-col">
      <div className="w-full flex-center border-b border-b-black py-20">
        <p className="text-center text-black font-extrabold text-[140px]">
          {/* SERVICES */}
        </p>
      </div>
      <div className="max-w-[1200px] w-full px-10 py-14 flex items-start justify-center flex-col">
        <div className="flex flex-col items-start w-full justify-center gap-y-5">
          <div className="flex-between w-full">
            <p className="text-[16px] font-normal text-black">
              Design. Build. Inspire
            </p>
            <p className="text-[16px] font-normal text-black">
              &quot;Shaping the Future Today&quot;
            </p>
          </div>
          <div className="flex-center">
            <p className="text-center text-black font-extrabold text-[140px]">
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

        <div className="flex justify-between max-w-[1000px] w-full py-16">
          <div className="flex flex-col items-start max-w-[500px] w-full">
            <div className="border w-[500px] h-[260px]"></div>
            <p className="text-[24px] leading-8 mt-6 font-medium text-black">
              Studio Daivikah : Our practice is rooted in thoughtful design,
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
            <div className="flex-between w-full">
              <p className="text-black text-[24px] font-medium">
                Architectural Design
              </p>
              <div className="text-black text-[24px]">+</div>
            </div>
            <div className="w-full h-px border border-gray-300/50" />
            <div className="flex-between w-full mt-2">
              <p className="text-black text-[24px] font-medium">
                3D Modeling & Visualization
              </p>
              <div className="text-black text-[24px]">+</div>
            </div>
            <div className="w-full h-px border border-gray-300/50" />
            <div className="flex-between w-full mt-2">
              <p className="text-black text-[24px] font-medium">
                Interior Design
              </p>
              <div className="text-black text-[24px]">+</div>
            </div>
            <div className="w-full h-px border border-gray-300/50" />
            <div className="flex-between w-full mt-2">
              <p className="text-black text-[24px] font-medium">
                Urban Planning
              </p>
              <div className="text-black text-[24px]">+</div>
            </div>
            <div className="w-full h-px border border-gray-300/50" />
          </div>
        </div>

        <div className="flex justify-between max-w-[1000px] w-full py-16">
          <div className="flex flex-col items-start max-w-[500px] w-full">
            <div className="border size-[500px]"></div>
          </div>

          <div className="flex flex-col items-start max-w-[400px] w-full gap-y-4">
            <div className="flex-between w-full">
              <p className="text-black text-[24px] font-normal">
                Project Management
              </p>
              <div className="text-black text-[24px]">+</div>
            </div>
            <div className="w-full h-px border border-gray-300/50" />
            <div className="flex-between w-full mt-2">
              <p className="text-black text-[24px] font-normal">
                Interior Architecture
              </p>
              <div className="text-black text-[24px]">+</div>
            </div>
            <div className="w-full h-px border border-gray-300/50" />
            <div className="flex-between w-full mt-2">
              <p className="text-black text-[24px] font-normal">
                3D Visualization
              </p>
              <div className="text-black text-[24px]">+</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between max-w-[1000px] w-full py-16">
          <div className="flex flex-col items-start max-w-[400px] w-full gap-y-4">
            <p className="text-black font-medium text-[26px]">
              Innovative Spaces. Timeless Designs.
            </p>
            <div className="flex-between w-full">
              <p className="text-black text-[24px] font-normal">
                Design Excellence
              </p>
              <div className="text-black text-[24px]">+</div>
            </div>
            <div className="w-full h-px border border-gray-300/50" />
            <div className="flex-between w-full mt-2">
              <p className="text-black text-[24px] font-normal">
                Sustainable Architecture
              </p>
              <div className="text-black text-[24px]">+</div>
            </div>
            <div className="w-full h-px border border-gray-300/50" />
            <div className="flex-between w-full mt-2">
              <p className="text-black text-[24px] font-normal">
                Space Planning
              </p>
              <div className="text-black text-[24px]">+</div>
            </div>
          </div>
          <div className="flex flex-col items-start max-w-[500px] w-full">
            <div className="border size-[500px]"></div>
          </div>
        </div>

        <div className="flex flex-col items-start w-full justify-center gap-y-5">
          <div className="flex-between w-full">
            <p className="text-[16px] font-normal text-black">
              Where Vision Meets Reality
            </p>
            <p className="text-[16px] font-normal text-black">
              &quot;Crafting Future Landmarks&quot;
            </p>
          </div>
          <div className="flex-center">
            <p className="text-center text-black font-extrabold text-[140px]">
              TEAM
            </p>
          </div>
          <div className="flex-center max-w-[700px] w-full">
            <p className="text-[24px] text-black font-normal leading-7">
              Daivaikah Architecture welcomes you! Together, we build
              extraordinary spaces through imagination, precision, and a shared
              love for design.
            </p>
          </div>
        </div>
      </div>

      <MainFooter />
      <Footer />
    </section>
  );
};

export default page;

import MaintenanceView from "@/components/maintenance/MaintenanceView";
import type { Metadata } from "next";

/* 
// ============================================================================
// PREVIOUS ORIGINAL PAGE IMPORTS (Uncomment when taking site out of maintenance)
// ============================================================================
import Footer from "@/components/footer/footer";
import MainFooter from "@/components/footer/mainfooter";
import Hero from "@/components/hero/hero";
import Navbar from "@/components/nav/navbar";
import Image from "next/image";
*/

/*
// ============================================================================
// PREVIOUS ORIGINAL METADATA
// ============================================================================
export const metadata: Metadata = {
  title: "Concept to Creation | Architecture & Interior Design",
  description:
    "Welcome to Studio Daivikah — where imagination takes shape in steel and stone. Expert architectural design, 3D visualization, interior architecture, and urban planning.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Concept to Creation | Architecture & Interior Design | Studio Daivikah",
    description:
      "Welcome to Studio Daivikah — where imagination takes shape in steel and stone. Expert architectural design, 3D visualization, interior architecture, and urban planning.",
    url: "https://studiodaivikah.com",
  },
};
*/

export const metadata: Metadata = {
  title: "Website Under Maintenance | Studio Daivikah",
  description:
    "Studio Daivikah website is currently under maintenance. We are updating our digital space — stay tuned for an upgraded experience.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Website Under Maintenance | Studio Daivikah",
    description:
      "Studio Daivikah website is currently under maintenance. Stay tuned for an upgraded architectural experience.",
    url: "https://studiodaivikah.com",
  },
};

export default function Home() {
  // Maintenance View
  return <MaintenanceView />;

  /*
  // ============================================================================
  // PREVIOUS ORIGINAL HOME PAGE LAYOUT (Uncomment to restore original website)
  // ============================================================================
  return (
    <section className="w-full flex pt-20 flex-col items-center">
      <Navbar />
      <div className="relative w-full h-[calc(100vh-80px)] min-h-[560px] max-h-[900px] sm:h-[750px] md:h-[820px] flex items-center justify-center overflow-hidden">
        <Image fill src="/images/herobg.jpg" alt="Hero Background" className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40 z-0" />
        <Hero />
      </div>
      <MainFooter />
      <Footer />
    </section>
  );
  */
}

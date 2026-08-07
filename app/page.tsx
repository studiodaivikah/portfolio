import Footer from "@/components/footer/footer";
import MainFooter from "@/components/footer/mainfooter";
import Hero from "@/components/hero/hero";
import Navbar from "@/components/nav/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full flex pt-20 flex-col items-center">
      <Navbar />
      <div className="relative w-full h-[calc(100vh-80px)] min-h-[560px] max-h-[900px] sm:h-[750px] md:h-[820px] flex items-center justify-center overflow-hidden">
        <Image fill src="/images/herobg.jpg" alt="Hero Background" className="object-cover object-center" priority />
        {/* Dark overlay for contrast and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40 z-0" />
        <Hero />
      </div>
      <MainFooter />
      <Footer />
    </section>
  );
}

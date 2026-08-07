import Footer from "@/components/footer/footer";
import MainFooter from "@/components/footer/mainfooter";
import Hero from "@/components/hero/hero";
import Navbar from "@/components/nav/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <section className="w-full flex pt-20 flex-col items-center">
      <Navbar />
      <div className="relative w-full h-[1000px] sm:h-[800px] flex-center overflow-hidden">
        <Image fill src="/images/herobg.jpg" alt="Hero Background" className="object-cover" priority />
        <Hero />
      </div>
      <MainFooter />
      <Footer />
    </section>
  );
}

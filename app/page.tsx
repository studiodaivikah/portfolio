import Footer from "@/components/footer/footer";
import MainFooter from "@/components/footer/mainfooter";
import Hero from "@/components/hero/hero";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col">
      <div className="relative w-screen h-[1000px] sm:h-[800px] flex-center">
        <Image fill src="/images/herobg.jpg" alt="Hero Background" />
        <Hero />
      </div>
      <MainFooter />
      <Footer />
    </section>
  );
}

import Hero from "@/components/hero/hero";
import Navbar from "@/components/nav/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-center flex-col max-w-[2800px] w-full">
      <Navbar />
      <div className="relative w-screen h-[1000px] sm:h-[800px] flex-center">
        <Image fill src="/images/herobg.jpg" alt="Hero Background" />
        <Hero />
      </div>
    </main>
  );
}

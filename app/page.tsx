import Hero from "@/components/hero/hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-screen h-[1000px] sm:h-[800px] flex-center">
      <Image fill src="/images/herobg.jpg" alt="Hero Background" />
      <Hero />
    </div>
  );
}

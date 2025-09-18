import Footer from "@/components/footer/footer";
import MainFooter from "@/components/footer/mainfooter";
import Hero from "@/components/hero/hero";
import Navbar from "@/components/nav/navbar";
import Image from "next/image";

// export default function Home() {
//   return (
//     <section className="flex pt-20 flex-col">
//       <Navbar />
//       <div className="relative w-screen h-[1000px] sm:h-[800px] flex-center">
//         <Image fill src="/images/herobg.jpg" alt="Hero Background" />
//         <Hero />
//       </div>
//       <MainFooter />
//       <Footer />
//     </section>
//   );
// }

export default function Home() {
  return (
    <section className="flex flex-col items-center w-screen h-screen justify-center gap-6 bg-white">
      <p className="text-black font-medium text-[18px]">
        Website is under maintenance
      </p>
      <p className="text-black font-medium text-[16px]">Stay connected</p>
    </section>
  );
}

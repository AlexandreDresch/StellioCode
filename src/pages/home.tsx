import Footer from "@/components/Footer";
import Header from "../components/header";
import Hero from "../components/Hero";
import OurServices from "../components/OurServices";
import Portfolio from "@/components/Portfolio";
import Plans from "@/components/Plans";
import { plans } from "@/constants/plans";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black opacity-10"></div>
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-red-500/10 via-green-500/10 to-blue-500/10 opacity-20"></div>

      <Header />
      <Hero />

      <main className="flex flex-col items-center justify-center bg-[#3d2171]">
        <OurServices />

        <Portfolio />

        <div className="min-w-full bg-[#bba4ff] pt-52">
          <Plans plans={plans} view={"client"} />
        </div>
      </main>

      <div className="relative bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
}

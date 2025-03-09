import Footer from "@/components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import OurServices from "../components/OurServices";
import Portfolio from "@/components/Portfolio";
import Plans from "@/components/Plans";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black opacity-10"></div>
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-red-500/10 via-green-500/10 to-blue-500/10 opacity-20"></div>

      <Header />
      <Hero />

      <main className="flex flex-col items-center justify-center bg-[#5B1F83]">
        <div className="bg-[#151a42]">
          <div className="w-full">
            <OurServices />
          </div>

          <Portfolio />
        </div>
        <div className="bg-[#5B1F83]">
          <Plans />
        </div>
      </main>

      <div className="relative bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
}

import Footer from "@/components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import OurServices from "../components/OurServices";

export default function home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-col items-center justify-center">
        <Hero />
        <div className="w-full">
          <OurServices />
        </div>
      </main>

      <div className="relative bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
}

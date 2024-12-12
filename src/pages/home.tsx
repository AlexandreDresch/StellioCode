import Footer from "@/components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default function home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-grow">
        <Hero />
      </main>

      <Footer />
    </div>
  );
}

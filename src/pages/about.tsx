import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import MissionValues from "@/components/aboutpage/missionvalues";
import Team from "@/components/aboutpage/team";
import Approach from "@/components/aboutpage/approach";
import Stacks from "@/components/aboutpage/stacks";
import Roadmap from "@/components/aboutpage/roadmap";
import Testimonials from "@/components/aboutpage/testimonials";
import Header from "@/components/header";
import Footer from "@/components/Footer";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="h-full w-full scroll-smooth bg-white transition-colors duration-500 dark:bg-gray-900">
      <header className="fixed z-50 flex min-h-16 min-w-full flex-col">
        <Header />
      </header>

      <main>
        <section
          className="missionvalues-container bg-[url('bg-missaovalores-light.svg')] bg-cover bg-center bg-no-repeat dark:bg-[url('bg-missaovalores-dark'.svg)]"
          data-aos="fade-up"
        >
          <MissionValues />
        </section>

        <section className="team-container p-6" data-aos="fade-up">
          <div className="container mx-auto text-center">
            <h1 className="mb-6 text-3xl font-bold text-gray-800 dark:text-white">
              Conheça nosso time de desenvolvedores:
            </h1>
            <Team />
          </div>
        </section>

        <section
          className="approach-container bg-[url('bg-approach-light.svg')] bg-cover bg-center bg-no-repeat text-center dark:bg-[url('bg-approach-dark.svg')] dark:text-gray-100"
          data-aos="fade-up"
        >
          <Approach />
        </section>

        <section className="stacks-container" data-aos="fade-up">
          <Stacks />
        </section>

        <section className="roadmap-container" data-aos="fade-up">
          <Roadmap />
        </section>

        <section className="testimonials-container" data-aos="fade-up">
          <Testimonials />
        </section>
      </main>

      <Footer />
    </div>
  );
}

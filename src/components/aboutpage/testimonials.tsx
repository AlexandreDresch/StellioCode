import React, { useRef, useState } from "react";
import { useKeenSlider, KeenSliderInstance } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const testimonials = [
  {
    title: "Transformação digital completa",
    content:
      "A equipe da StellioCode revolucionou nossa presença online. Nosso novo site é moderno, intuitivo e super responsivo. Recomendo fortemente!",
    author: "Ana Souza, CEO da Tech Solutions",
  },
  {
    title: "Profissionalismo e agilidade",
    content:
      "Ficamos impressionados com a rapidez na entrega e a qualidade do trabalho. Eles compreenderam nossas necessidades e superaram as expectativas.",
    author: "Carlos Lima, Gerente de TI na InovaSoft",
  },
  {
    title: "Inovação em cada detalhe",
    content:
      "Desde o design até a implementação, tudo foi pensado para proporcionar a melhor experiência. O suporte pós-entrega também foi excepcional.",
    author: "Fernanda Costa, Fundadora da WebGrow",
  },
  {
    title: "Resultados que falam por si",
    content:
      "Nosso projeto ganhou vida com a criatividade e expertise da equipe. A comunicação foi clara e eficiente do início ao fim.",
    author: "Ricardo Mendes, Diretor de Marketing na DigitalWave",
  },
  {
    title: "Excelência no atendimento",
    content:
      "O atendimento personalizado e a dedicação em entender nossos desafios fizeram toda a diferença. Estamos muito satisfeitos com o resultado.",
    author: "Mariana Oliveira, Empreendedora",
  },
];

const Testimonials: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const sliderRef = useRef<KeenSliderInstance | null>(null);

  const [sliderContainerRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      origin: "center",
      perView: 1.25,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 1024px)": {
        slides: {
          origin: "auto",
          perView: 1.5,
          spacing: 32,
        },
      },
    },
    created(instance) {
      setLoaded(true);
      sliderRef.current = instance;
    },
  });

  const handlePrev = () => {
    sliderRef.current?.prev();
  };

  const handleNext = () => {
    sliderRef.current?.next();
  };

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-[1340px] px-4 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
          <div className="max-w-xl text-center sm:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Não acredite apenas em nossa palavra...
            </h2>
            <p className="mt-4 text-gray-700">
              Veja o que nossos clientes têm a dizer sobre os resultados e o
              impacto de nossas soluções.
            </p>
            {loaded && (
              <div className="hidden lg:mt-8 lg:flex lg:gap-4">
                <button
                  aria-label="Previous slide"
                  onClick={handlePrev}
                  className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 rtl:rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  aria-label="Next slide"
                  onClick={handleNext}
                  className="rounded-full border border-rose-600 p-3 text-rose-600 transition hover:bg-rose-600 hover:text-white"
                >
                  <svg
                    className="size-5 rtl:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="-mx-6 lg:col-span-2 lg:mx-0">
            <div ref={sliderContainerRef} className="keen-slider">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="keen-slider__slide">
                  <blockquote className="shadow-xs flex h-full flex-col justify-between bg-white p-6 sm:p-8 lg:p-12">
                    <div>
                      <div className="flex gap-0.5 text-green-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className="size-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <div className="mt-4">
                        <p className="text-2xl font-bold text-rose-600 sm:text-3xl">
                          {testimonial.title}
                        </p>
                        <p className="mt-4 leading-relaxed text-gray-700">
                          {testimonial.content}
                        </p>
                      </div>
                    </div>
                    <footer className="mt-4 text-sm font-medium text-gray-700 sm:mt-6">
                      &mdash; {testimonial.author}
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>
        {loaded && (
          <div className="mt-8 flex justify-center gap-4 lg:hidden">
            <button
              aria-label="Previous slide"
              onClick={handlePrev}
              className="rounded-full border border-rose-600 p-4 text-rose-600 transition hover:bg-rose-600 hover:text-white"
            >
              <svg
                className="size-5 -rotate-180 transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <button
              aria-label="Next slide"
              onClick={handleNext}
              className="rounded-full border border-rose-600 p-4 text-rose-600 transition hover:bg-rose-600 hover:text-white"
            >
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

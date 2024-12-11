//

import SpringCarousel from "@/components/ui/spring-carousel";
// https://react-spring-carousel.emilianobucci.com/docs/install

export default function About() {
  return (
    <div className="h-svh w-full scroll-smooth">
      <header>
        <div className="fixed z-50 flex min-h-16 min-w-full flex-col items-center justify-center bg-gray-100 bg-slate-400">
          <p>Aqui tem um header.</p>
        </div>
      </header>

      <main className="flex min-h-screen min-w-full flex-col">
        <div className="sobre-nos-container flex h-svh w-full flex-row items-center bg-[url('/bg-container-about-sobrenos.svg')] bg-cover bg-center p-16">
          <div className="mr-10 flex flex-col">
            <h1 className="mb-4 text-end text-4xl font-bold tracking-widest text-[#61aa56]">
              Seu time de desenvolvimento a um clique de distância
            </h1>
            <p className="text-justify text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
              a inventore voluptas quam odio excepturi laboriosam quo incidunt
              atque nemo repudiandae, minus, perspiciatis ut illo accusantium,
              debitis illum veritatis ipsum eaque! A eum quod explicabo
              aspernatur labore perferendis, sint natus?
            </p>
          </div>
          {/* Inserir texto sobre a empresa */}
          <img
            src="/multi-device-website-mockup-462-1.jpg"
            alt="Mockup de uma página em dispositivos desktop, tablet e mobile."
            className="max-h-auto m-4 min-w-60 max-w-[35em] rounded-lg"
          />
          {/* Alterar imagem */}
        </div>

        <div className="valores-container flex max-h-screen w-full flex-col items-center">
          <div className="mt-10 flex flex-col items-center">
            <h1 className="mb-4 text-4xl font-bold tracking-widest text-gray-800">
              Valores e Objetivos
            </h1>
            <p className="mb-6 text-xl text-gray-600">
              Como uma Software House em ascenção, prezamos por{" "}
              <span className="font-bold text-[#3b8ea5ff]">
                inovação, confiança, agilidade e qualidade
              </span>
              , buscando alcançar novos horizontes junto ao seu negócio.
            </p>
          </div>

          <SpringCarousel />
        </div>
      </main>
    </div>
  );
}

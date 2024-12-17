import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faHandshake,
  faRocket,
  faCheckCircle,
  faLeaf,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Team from "@/components/team";

export default function About() {
  return (
    <div className="h-full w-full scroll-smooth bg-white transition-colors duration-500 dark:bg-gray-900">
      <header>
        <div className="fixed z-50 flex min-h-16 min-w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 dark:text-white">
          <p>Aqui tem um header</p>
        </div>
      </header>

      <main className="flex min-h-screen flex-col">
        <section className="missaovalores-container lg:h-min-h-[80vh] mt-6 flex items-center justify-center bg-[#f9faf9] p-4 dark:bg-gray-900 dark:text-gray-100">
          <div className="container mx-auto flex flex-col items-center justify-center sm:mt-6 lg:flex-row">
            <div className="flex flex-col items-center justify-center rounded-sm p-4 text-center lg:mr-12 lg:max-w-md lg:items-start lg:text-left xl:max-w-lg">
              <h1 className="text-6xl font-bold leading-none text-gray-800 dark:text-white sm:text-7xl">
                Nossa{" "}
                <span className="tracking-wider text-violet-600">Missão</span>
              </h1>
              <p className="mb-6 mt-6 text-justify text-lg text-gray-600 dark:text-gray-300 sm:mb-12">
                Aqui na{" "}
                <span className="to-pink-400 font-extrabold tracking-widest text-purple-400">
                  StellioCode
                </span>{" "}
                buscamos oferecer soluções tecnológicas inovadoras e de alta
                qualidade. Através de{" "}
                <strong className="tracking-wider text-violet-600">
                  aplicações web modernas
                </strong>
                ,{" "}
                <strong className="tracking-wider text-green-500">
                  soluções mobile
                </strong>
                ,{" "}
                <strong className="tracking-wider text-yellow-500">
                  design UI/UX
                </strong>{" "}
                e{" "}
                <strong className="tracking-wider text-blue-500">
                  parcerias sólidas
                </strong>
                , transformamos ideias em resultados reais, garantindo
                excelência e superando as expectativas dos nossos clientes.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex transform flex-col items-center rounded-lg bg-white p-4 shadow-lg transition duration-300 hover:scale-105 dark:bg-gray-800">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 p-3 text-blue-500 shadow-md dark:bg-blue-900">
                  <FontAwesomeIcon icon={faLightbulb} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Inovação
                </h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  Buscamos soluções modernas e criativas para transformar ideias
                  em realidade
                </p>
              </div>

              <div className="flex transform flex-col items-center rounded-lg bg-white p-4 shadow-lg transition duration-300 hover:scale-105 dark:bg-gray-800">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 p-3 text-green-500 shadow-md dark:bg-green-900">
                  <FontAwesomeIcon icon={faUsers} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Confiança
                </h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  Transparência e respeito ao cliente estão em nosso DNA
                </p>
              </div>

              <div className="flex transform flex-col items-center rounded-lg bg-white p-4 shadow-lg transition duration-300 hover:scale-105 dark:bg-gray-800">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 p-3 text-yellow-500 shadow-md dark:bg-yellow-900">
                  <FontAwesomeIcon icon={faRocket} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Agilidade
                </h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  Processos rápidos e eficientes sem perder a qualidade
                </p>
              </div>

              <div className="flex transform flex-col items-center rounded-lg bg-white p-4 shadow-lg transition duration-300 hover:scale-105 dark:bg-gray-800">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-100 p-3 text-red-500 shadow-md dark:bg-red-900">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Qualidade
                </h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  Garantimos resultados de alta performance e excelência
                </p>
              </div>

              <div className="flex transform flex-col items-center rounded-lg bg-white p-4 shadow-lg transition duration-300 hover:scale-105 dark:bg-gray-800">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 p-3 text-teal-500 shadow-md dark:bg-teal-900">
                  <FontAwesomeIcon icon={faLeaf} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Sustentabilidade
                </h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  Promovemos soluções que respeitam o meio ambiente
                </p>
              </div>

              <div className="flex transform flex-col items-center rounded-lg bg-white p-4 shadow-lg transition duration-300 hover:scale-105 dark:bg-gray-800">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 p-3 text-purple-500 shadow-md dark:bg-purple-900">
                  <FontAwesomeIcon icon={faHandshake} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Colaboração
                </h3>
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  Trabalhamos juntos para entregar o melhor para você
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="equipe-container flex items-center justify-center bg-gray-50 py-12 dark:bg-gray-900 lg:max-h-screen">
          <div className="container mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold text-black dark:text-white">
              Conheça nosso time de desenvolvedores:
            </h1>
            <Team />
          </div>
        </section>

        <section className="approach-container"></section>

        <section className="stacks-container"></section>

        <section className="roadmap-container"></section>

        <section className="depoimentos-container"></section>
      </main>

      <footer className="bg-gray-950 py-4 dark:bg-gray-800 dark:text-white">
        <div className="flex items-center justify-center">
          <p className="text-white">Aqui tem um footer</p>
        </div>
      </footer>
    </div>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faHandshake,
  faRocket,
  faCheckCircle,
  faLeaf,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function MissionValues() {
  const values = [
    {
      icon: faLightbulb,
      title: "Inovação",
      description:
        "Buscamos soluções modernas e criativas para transformar ideias em realidade.",
      color: "blue",
    },
    {
      icon: faUsers,
      title: "Confiança",
      description: "Transparência e respeito ao cliente estão em nosso DNA.",
      color: "green",
    },
    {
      icon: faRocket,
      title: "Agilidade",
      description: "Processos rápidos e eficientes sem perder a qualidade.",
      color: "yellow",
    },
    {
      icon: faCheckCircle,
      title: "Qualidade",
      description: "Garantimos resultados de alta performance e excelência.",
      color: "red",
    },
    {
      icon: faLeaf,
      title: "Sustentabilidade",
      description: "Promovemos soluções que respeitam o meio ambiente.",
      color: "teal",
    },
    {
      icon: faHandshake,
      title: "Colaboração",
      description: "Trabalhamos juntos para entregar o melhor para você.",
      color: "purple",
    },
  ];

  return (
    <div className="mx-auto h-fit p-8 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-24">
      <div className="mb-12 max-w-2xl sm:text-center md:mx-auto lg:max-w-3xl">
        <h2 className="mb-6 max-w-lg font-sans text-4xl font-bold leading-none tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:mx-auto">
          Nossa Missão
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 md:text-xl">
          Aqui na{" "}
          <span className="font-extrabold text-purple-400">StellioCode</span>,
          buscamos oferecer soluções tecnológicas inovadoras e de alta
          qualidade. Através de{" "}
          <span className="text-violet-600">aplicações web modernas</span>,{" "}
          <span className="text-green-500">soluções mobile</span>,{" "}
          <span className="text-yellow-500">design UI/UX</span>, e{" "}
          <span className="text-blue-500">parcerias sólidas</span>,
          transformamos ideias em resultados reais.
        </p>
      </div>
      <div className="mx-auto grid max-w-screen-lg gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="mb-6">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full bg-${value.color}-100 dark:bg-${value.color}-800`}
              >
                <FontAwesomeIcon
                  icon={value.icon}
                  className={`text-2xl text-${value.color}-600 dark:text-${value.color}-300`}
                />
              </div>
            </div>
            <h6 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
              {value.title}
            </h6>
            <p className="text-base text-gray-700 dark:text-gray-300">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

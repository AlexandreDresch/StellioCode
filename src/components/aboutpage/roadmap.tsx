import React from "react";

interface Step {
  title: string;
  description: string;
  icon: JSX.Element;
  numberBg: string;
  lineBg: string;
}

const steps: Step[] = [
  {
    title: "Briefing",
    description:
      "Reunião para definição dos requisitos e entendimento do projeto.",
    icon: (
      <svg
        className="ml-2 mt-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#e53e3e"
        width="32px"
        height="32px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
      </svg>
    ),
    numberBg: "bg-red-600",
    lineBg: "bg-red-600",
  },
  {
    title: "Planejamento",
    description:
      "Elaboração de estratégias e cronogramas para o desenvolvimento.",
    icon: (
      <svg
        className="ml-2 mt-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="#dd6b20"
        viewBox="0 0 24 24"
        width="32px"
        height="32px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
      </svg>
    ),
    numberBg: "bg-orange-600",
    lineBg: "bg-orange-600",
  },
  {
    title: "Design",
    description: "Criação do layout e experiência do usuário.",
    icon: (
      <svg
        className="ml-2 mt-2"
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        viewBox="0 0 24 24"
        fill="#38a169"
        width="32px"
        height="32px"
      >
        <g>
          <rect fill="none" height="24" width="24" />
        </g>
        <g>
          <g>
            <path d="M6.36,18.78L6.61,21l1.62-1.54l2.77-7.6c-0.68-0.17-1.28-0.51-1.77-0.98L6.36,18.78z" />
            <path d="M14.77,10.88c-0.49,0.47-1.1,0.81-1.77,0.98l2.77,7.6L17.39,21l0.26-2.22L14.77,10.88z" />
            <path d="M15,8c0-1.3-0.84-2.4-2-2.82V3h-2v2.18C9.84,5.6,9,6.7,9,8c0,1.66,1.34,3,3,3S15,9.66,15,8z M12,9c-0.55,0-1-0.45-1-1 c0-0.55,0.45-1,1-1s1,0.45,1,1C13,8.55,12.55,9,12,9z" />
          </g>
        </g>
      </svg>
    ),
    numberBg: "bg-green-600",
    lineBg: "bg-green-600",
  },
  {
    title: "Desenvolvimento",
    description: "Codificação e implementação das funcionalidades.",
    icon: (
      <svg
        className="ml-2 mt-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#3182ce"
        width="32px"
        height="32px"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
      </svg>
    ),
    numberBg: "bg-blue-600",
    lineBg: "bg-blue-600",
  },
  {
    title: "Entrega",
    description: "Deploy e lançamento da solução final.",
    icon: (
      <svg
        className="ml-2 mt-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="#9f7aea"
        viewBox="0 0 24 24"
        width="32px"
        height="32px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M20 8h-3V4H7v4H4v12h16V8zm-5 0H9V6h6v2z" />
      </svg>
    ),
    numberBg: "bg-purple-600",
    lineBg: "bg-purple-600",
  },
  {
    title: "Suporte Pós-Entrega",
    description: "Manutenção e acompanhamento após o lançamento.",
    icon: (
      <svg
        className="ml-2 mt-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="#319795"
        viewBox="0 0 24 24"
        width="32px"
        height="32px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.94 8.16 7 9.5v-6.73H7v-2.77h2v-2.12c0-2.07 1.25-3.2 3.11-3.2.9 0 1.84.16 1.84.16v2.02h-1.04c-1.02 0-1.34.64-1.34 1.29v1.54h2.28l-.36 2.77h-1.92V21.5c4.06-1.34 7-5.09 7-9.5 0-5.52-4.48-10-10-10z" />
      </svg>
    ),
    numberBg: "bg-teal-600",
    lineBg: "bg-teal-600",
  },
];

const Roadmap: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <section>
        <h2 className="text-center text-4xl font-extrabold text-gray-700">
          Nosso Roadmap
        </h2>
        <p className="text-md text-center text-gray-600">
          Saiba como trabalharemos lado a lado em prol do melhor desenvolvimento
          tecnológico para sua empresa
        </p>
        <div className="flex-wrap content-center lg:flex lg:items-center lg:justify-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="m-auto flex justify-center pt-10 lg:mx-6 lg:my-8 lg:w-1/3"
            >
              <div className="relative h-48 w-64">
                {/* Card com título e descrição */}
                <div className="absolute left-0 top-0 ml-6 mt-6 flex h-40 w-64 items-center rounded-lg border-8 border-solid border-gray-700 bg-white">
                  <div className="h-40 w-1/3"></div>
                  <div className="h-32 w-2/3 pr-4">
                    <h3 className="pt-1 text-xl font-semibold text-gray-700">
                      {step.title}
                    </h3>
                    <p className="pt-1 text-sm text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
                {/* Ícone */}
                <div className="absolute left-0 top-0 z-20 ml-6 mt-6 h-12 w-12 rounded-full bg-white">
                  {step.icon}
                </div>
                {/* Número da etapa */}
                <div
                  className={`absolute left-0 top-0 z-10 h-40 w-24 py-20 text-center text-5xl font-bold text-white ${step.numberBg} rounded-lg`}
                >
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </div>
                {/* Linha de conexão */}
                <div
                  className={`absolute left-0 top-0 z-30 ml-48 mt-40 h-2 w-24 ${step.lineBg}`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Roadmap;

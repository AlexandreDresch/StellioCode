import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSync,
  faCheckCircle,
  faCogs,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";

export default function Approach() {
  return (
    <div className="mx-auto h-fit p-8 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 lg:py-24">
      <div className="mb-12 max-w-2xl sm:text-center md:mx-auto lg:max-w-3xl">
        <h2 className="mb-6 max-w-lg font-sans text-4xl font-bold leading-none tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:mx-auto">
          Como trabalhamos
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 md:text-xl">
          Princípios e estratégias que guiam nosso trabalho para transformar
          ideias em resultados reais.
        </p>
      </div>
      <div className="mx-auto grid max-w-screen-lg gap-8 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-800">
              <FontAwesomeIcon
                icon={faUser}
                className="text-2xl text-teal-600 dark:text-teal-300"
              />
            </div>
          </div>
          <h6 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
            Foco no Usuário
          </h6>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Colocamos o usuário no centro de cada decisão para criar
            experiências intuitivas e eficientes.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-800">
              <FontAwesomeIcon
                icon={faSync}
                className="text-2xl text-purple-600 dark:text-purple-300"
              />
            </div>
          </div>
          <h6 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
            Metodologias Ágeis
          </h6>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Utilizamos métodos ágeis para garantir entregas rápidas, eficientes
            e com constante evolução.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-800">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-2xl text-green-600 dark:text-green-300"
              />
            </div>
          </div>
          <h6 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
            Qualidade e Escalabilidade
          </h6>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Criamos soluções robustas, escaláveis e seguras, garantindo
            excelência em cada entrega.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800">
              <FontAwesomeIcon
                icon={faCogs}
                className="text-2xl text-blue-600 dark:text-blue-300"
              />
            </div>
          </div>
          <h6 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
            Inovação Contínua
          </h6>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Incorporamos as mais novas tecnologias para entregar soluções à
            frente do mercado.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-300 dark:bg-pink-100">
              <FontAwesomeIcon
                icon={faPeopleArrows}
                className="text-2xl text-pink-600 dark:text-pink-300"
              />
            </div>
          </div>
          <h6 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
            Proximidade
          </h6>
          <p className="text-base text-gray-700 dark:text-gray-300">
            Além da nossa primeira reunião gratuita, você poderá acompanhar de
            perto o desenvolvimento do seu projeto por meio de novos encontros e
            da nossa moderna dashboard de monitoramento.
          </p>
        </div>
      </div>
    </div>
  );
}

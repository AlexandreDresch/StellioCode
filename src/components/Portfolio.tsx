import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Importar o Framer Motion

export default function Portfolio() {
  const words = ["seus clientes.", "sua marca.", "seu estilo."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const speed = isDeleting ? 50 : 100;

  useEffect(() => {
    const word = words[currentWordIndex];

    if (!isDeleting && displayedText === word) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1),
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <div className="left-0 flex flex-col bg-[#151a42]">
      <div className="absolute z-10 ml-24 flex flex-col gap-10">
        <div className="flex flex-col items-center justify-center lg:flex-row lg:gap-32">
          {/* Animação para o título */}
          <motion.h3
            className="pb-20 pt-10 font-mono text-5xl font-semibold text-white lg:w-[400px]"
            initial={{ opacity: 0 }} // Começa invisível
            animate={{ opacity: 1 }} // Fica visível
            transition={{ duration: 1 }} // Animação por 1 segundo
          >
            Projetos <br /> desenvolvidos
          </motion.h3>

          {/* Animação para os cards */}
          <motion.div
            className="flex flex-wrap items-center rounded-none"
            initial={{ opacity: 0 }} // Começa invisível
            animate={{ opacity: 1 }} // Fica visível
            transition={{ duration: 1, delay: 0.2 }} // Delay de 0.2s antes de começar
          >
            <Card className="flex w-[40rem] items-center">
              <img
                className="h-[270px] w-[300px] rounded-bl-xl rounded-tl-xl object-cover"
                src="portfolio01.avif"
                alt="Projeto 2"
              />
              <div className="flex flex-col">
                <CardHeader>
                  <CardTitle className="font-mono text-2xl">
                    Hairsaloon Website
                  </CardTitle>
                </CardHeader>
                <CardContent className="justify-start">
                  <span className="rounded bg-purple-400 px-1">
                    Aplicação Web
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <a
                    href="#"
                    className="flex justify-end text-blue-500 hover:underline"
                  >
                    Veja mais
                  </a>
                </CardFooter>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="flex-col items-center justify-center gap-32 lg:flex lg:flex-row">
          {/* Animação para mais cards */}
          <motion.div
            className="flex flex-wrap rounded-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Card className="flex w-[40rem] items-center">
              <img
                className="h-[270px] w-[300px] rounded-bl-xl rounded-tl-xl object-cover"
                src="portfolio01.avif"
                alt="Projeto 2"
              />
              <div className="flex w-96 flex-col">
                <CardHeader>
                  <CardTitle className="font-mono text-2xl">Petshop</CardTitle>
                </CardHeader>
                <CardContent className="justify-start">
                  <span className="rounded bg-purple-400 px-1">
                    Aplicação Mobile
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <a
                    href="#"
                    className="flex justify-end text-blue-500 hover:underline"
                  >
                    Veja mais
                  </a>
                </CardFooter>
              </div>
            </Card>
          </motion.div>

          <motion.div
            className="w-[400px] text-3xl text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            De acordo com{" "}
            <span className="text-purple-400">{displayedText}</span>|
          </motion.div>
        </div>

        <div className="flex-col items-center justify-center gap-32 lg:flex lg:flex-row">
          <motion.h3
            className="w-[400px] pb-20 pt-10 font-mono text-4xl font-semibold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Com o cuidado <br /> que sua marca merece
          </motion.h3>

          <motion.div
            className="flex flex-wrap items-center rounded-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <Card className="flex w-[40rem] items-center">
              <img
                className="h-[270px] w-full rounded-bl-xl rounded-tl-xl object-cover"
                src="portfolio01.avif"
                alt="Projeto 2"
              />
              <div className="flex w-96 flex-col">
                <CardHeader>
                  <CardTitle className="font-mono text-2xl">Chatbot</CardTitle>
                </CardHeader>
                <CardContent className="justify-start">
                  <span className="rounded bg-purple-400 px-1">ChatBot</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <a
                    href="#"
                    className="flex justify-end text-blue-500 hover:underline"
                  >
                    Veja mais
                  </a>
                </CardFooter>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          preserveAspectRatio="none"
          viewBox="0 0 1440 560"
          className="h-[200px] w-full max-w-[100vw] sm:h-[300px] md:h-[400px] lg:h-[700px]"
        >
          <g mask='url("#SvgjsMask1079")' fill="none">
            <path
              d="M 0,185 C 57.6,166.4 172.8,86.8 288,92 C 403.2,97.2 460.8,204 576,211 C 691.2,218 748.8,128.8 864,127 C 979.2,125.2 1036.8,201 1152,202 C 1267.2,203 1382.4,146 1440,132L1440 560L0 560z"
              fill="rgba(57, 7, 103, 1)"
            ></path>
            <path
              d="M 0,282 C 96,319.2 288,442.8 480,468 C 672,493.2 768,404.2 960,408 C 1152,411.8 1344,471.2 1440,487L1440 560L0 560z"
              fill="#5B1F83"
            ></path>
          </g>
          <defs>
            <mask id="SvgjsMask1079">
              <rect width="1640" height="560" fill="#ffffff"></rect>
            </mask>
          </defs>
        </svg>
      </div>
    </div>
  );
}

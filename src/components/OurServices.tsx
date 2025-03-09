import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ArrowRight,
  BotMessageSquare,
  Monitor,
  TabletSmartphone,
} from "lucide-react";

import { motion } from "framer-motion";

export default function NossosServicos() {
  return (
    <div className="dark:bg-stone flex flex-col bg-[#151a42] py-28 pb-32 text-white xl:flex-row xl:px-32">
      <div className="justify-centerself-center flex w-full max-w-[18rem] flex-col p-4 md:max-w-xl lg:flex lg:max-w-[400px]">
        <h3 className="py-3 text-4xl font-semibold">
          O QUE{" "}
          <span className="bg-gradient-to-r from-sky-500 to-fuchsia-400 bg-clip-text text-transparent">
            FAZEMOS
          </span>
          :
        </h3>
        <p>
          Somos o seu parceiro na transformação digital. Entregamos projetos
          customizados de acordo com as necessidades do seu negócio.
        </p>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col items-center justify-center transition-transform duration-300">
          <a className="rounded-md bg-gradient-to-r from-[#d450b1] via-[#8417de] to-[#7d22ce] bg-[length:200%_200%] bg-left p-1 transition-all duration-500 hover:bg-right">
            <Card className="relative max-h-[540px] min-h-[280px] w-[350px] cursor-pointer rounded border-0 bg-gradient-to-b from-[#3a0764] via-[#3a0764] to-[#4b018d] text-white shadow-lg transition-colors duration-1000 ease-in-out lg:w-[250px]">
              <CardHeader className="pb-2">
                <div className="flex gap-20">
                  <CardTitle className="font-mono text-[18px]">
                    Aplicações Web
                  </CardTitle>
                  <Monitor className="h-[24px] w-[100px]" />
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                Criamos aplicações web personalizadas que garantem uma
                experiência de usuário intuitiva e de alto desempenho, chamando
                clientes para seu negócio.
              </CardContent>
              <CardFooter className="flex items-center justify-end gap-5">
                <p className="hover:">SAIBA MAIS</p>
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    x: 10,
                    y: 0,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                  whileTap={{
                    scale: 0.999,
                  }}
                >
                  <ArrowRight className="w-4"></ArrowRight>
                </motion.div>
              </CardFooter>
            </Card>
          </a>
        </div>

        <div className="flex flex-col items-center justify-center transition-transform duration-300">
          <a className="rounded-md bg-gradient-to-r from-[#d450b1] via-[#8417de] to-[#7d22ce] bg-[length:200%_200%] bg-left p-1 transition-all duration-500 hover:bg-right">
            <Card className="relative max-h-[540px] min-h-[280px] w-[350px] cursor-pointer rounded border-0 bg-gradient-to-b from-[#3a0764] via-[#3a0764] to-[#4b018d] text-white shadow-lg transition-colors duration-1000 ease-in-out lg:w-[250px]">
              <CardHeader className="pb-2">
                <div className="flex gap-20">
                  <CardTitle className="font-mono text-[18px]">
                    Aplicativo Mobile
                  </CardTitle>
                  <TabletSmartphone className="h-[24px] w-[100px]" />
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                Desenvolvemos aplicativos móveis com design responsivo e
                funcionalidades que maximizam o engajamento dos usuários,
                adaptados para Android e iOS.
              </CardContent>
              <CardFooter className="flex items-center justify-end gap-5">
                <p>SAIBA MAIS</p>
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    x: 10,
                    y: 0,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                  whileTap={{
                    scale: 0.999,
                  }}
                >
                  <ArrowRight className="w-4"></ArrowRight>
                </motion.div>
              </CardFooter>
            </Card>
          </a>
        </div>

        <div className="flex flex-col items-center justify-center transition-transform duration-300">
          <a className="rounded-md bg-gradient-to-r from-[#d450b1] via-[#8417de] to-[#7d22ce] bg-[length:200%_200%] bg-left p-1 transition-all duration-500 hover:bg-right">
            <Card className="relative max-h-[540px] min-h-[280px] w-[350px] cursor-pointer rounded border-0 bg-gradient-to-b from-[#3a0764] via-[#3a0764] to-[#4b018d] text-white shadow-lg transition-colors duration-1000 ease-in-out lg:w-[250px]">
              <CardHeader className="pb-2">
                <div className="flex gap-44">
                  <CardTitle className="font-mono text-[18px]">
                    ChatBots
                  </CardTitle>
                  <BotMessageSquare />
                </div>
              </CardHeader>
              <CardContent className="text-sm">
                Oferecemos um chatbot para atender seus clientes de forma
                automática 24/7, resolvendo dúvidas e oferecendo respostas
                rápidas, melhorando a experiência do usuário e economizando
                tempo.
              </CardContent>
              <CardFooter className="flex items-center justify-end gap-5">
                <p>SAIBA MAIS</p>
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    x: 10,
                    y: 0,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                  whileTap={{
                    scale: 0.999,
                  }}
                >
                  <ArrowRight className="w-4"></ArrowRight>
                </motion.div>
              </CardFooter>
            </Card>
          </a>
        </div>
      </div>
    </div>
  );
}

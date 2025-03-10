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

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut", delay: index * 0.4 }, // Atraso mais longo
  }),
};

export default function NossosServicos() {
  return (
    <div className="dark:bg-stone flex flex-col items-center bg-[#151a42] py-28 pb-32 text-white lg:items-start xl:flex-row xl:px-32">
      {/* Seção de Título e Texto com animação de Fade-in mais lenta */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }} // Duração maior para o fade-in
        className="flex w-full max-w-[18rem] flex-col justify-center self-center p-4 pb-10 text-center md:max-w-xl lg:flex lg:max-w-[400px] lg:text-start"
      >
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
      </motion.div>

      {/* Cards de Serviços com animação ao rolar para a tela e transição mais lenta */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col gap-4 lg:flex-row"
      >
        {[
          {
            title: "Aplicações Web",
            icon: <Monitor className="h-[24px] w-[100px]" />,
            content:
              "Criamos aplicações web personalizadas que garantem uma experiência de usuário intuitiva e de alto desempenho, chamando clientes para seu negócio.",
          },
          {
            title: "Aplicativo Mobile",
            icon: <TabletSmartphone className="h-[24px] w-[100px]" />,
            content:
              "Desenvolvemos aplicativos móveis com design responsivo e funcionalidades que maximizam o engajamento dos usuários, adaptados para Android e iOS.",
          },
          {
            title: "ChatBots",
            icon: <BotMessageSquare />,
            content:
              "Oferecemos um chatbot para atender seus clientes de forma automática 24/7, resolvendo dúvidas e oferecendo respostas rápidas, melhorando a experiência do usuário e economizando tempo.",
          },
        ].map((service, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            className="flex flex-col items-center justify-center"
          >
            <a className="rounded-md bg-gradient-to-r from-[#6a2e71] via-[#72019f] to-[#84009b] bg-[length:200%_200%] bg-left p-1 transition-all duration-500 hover:bg-right">
              <Card className="duration-900 relative max-h-[540px] min-h-[280px] w-[350px] cursor-pointer rounded border-0 bg-gradient-to-r from-[#692970] via-[#72019f] to-[#84009b] bg-[length:200%_200%] bg-left p-1 text-white shadow-lg transition-all ease-in-out hover:bg-right lg:w-[250px]">
                <CardHeader className="pb-2">
                  <div className="flex gap-20">
                    <CardTitle className="font-mono text-[18px]">
                      {service.title}
                    </CardTitle>
                    {service.icon}
                  </div>
                </CardHeader>
                <CardContent className="text-sm">{service.content}</CardContent>
                <CardFooter className="flex items-center justify-end gap-5">
                  <p>SAIBA MAIS</p>
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      x: 10,
                      transition: { duration: 0.4, ease: "easeInOut" }, // Suavizar o efeito de hover
                    }}
                    whileTap={{ scale: 0.999 }}
                  >
                    <ArrowRight className="w-4" />
                  </motion.div>
                </CardFooter>
              </Card>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

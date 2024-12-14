import { Button } from "./ui/button";
import { motion } from "framer-motion";

// interface SectionProps {
//   children: React.ReactNode;
// }

// function Section({ children }: SectionProps) {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   return (
//     <section ref={ref}>
//       <span
//         style={{
//           transform: isInView ? "none" : "translateX(-200px)",
//           opacity: isInView ? 1 : 0,
//           transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
//         }}
//       >
//         {children}
//       </span>
//     </section>
//   );
// }

const AnimatedText = ({ text }: { text: string }) => {
  return (
    <span>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: index * 0.15,
            duration: 0.5,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// const FadeInText = ({ text }: { text: string }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{
//         duration: 2,
//         ease: "easeOut",
//       }}
//     >
//       {text}
//     </motion.div>
//   );
// };

export default function Hero() {
  return (
    <div className="my-10 flex min-h-screen flex-col items-center justify-center md:h-lvh xl:min-h-lvh">
      <main className="flex items-center justify-center xl:gap-24">
        <div className="m-4 flex flex-col justify-center gap-5">
          {/* <Section> */}
          <div className="text-5xl lg:text-7xl lg:font-semibold">
            {/* <FadeInText text="Bem-vindo a" /> */}
            <h2>Bem-vindo a</h2>
          </div>
          <div className="animate-gradient bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] bg-clip-text text-6xl font-semibold text-transparent">
            <AnimatedText text="StellioCode" />
          </div>

          <p className="mt-4 p-4 text-left text-3xl text-slate-500 xl:text-4xl">
            Onde sonhos viram websites!
          </p>
          {/* </Section> */}

          <div className="flex justify-center py-4">
            <motion.div
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
            >
              <Button
                variant="secondary"
                className="text-1xl bg-gradient-to-r from-sky-500 to-fuchsia-400 text-white"
                size="lg"
              >
                Marque sua reunião!
              </Button>
            </motion.div>
          </div>
        </div>

        <div>
          <img
            src="/heroImage.png"
            alt="Hero"
            className="object-fit hidden h-96 w-full xl:flex"
          />
        </div>
      </main>
    </div>
  );
}

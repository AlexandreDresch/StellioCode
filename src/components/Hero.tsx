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
    <div className="flex-colitems-center relative -z-10 flex min-h-screen w-full justify-center">
      <div className="hidden h-screen md:flex xl:flex">
        <video
          autoPlay
          loop
          muted
          className="absolute z-[-1] h-full w-full object-cover"
        >
          <source src="/hero-bg5.mp4" type="video/mp4" />
        </video>
      </div>

      <main className="flex h-full w-full flex-col text-black md:text-white xl:gap-24 xl:text-white">
        <div className="ml-24 mt-32 flex flex-col justify-center gap-5">
          <div className="font-mono text-5xl md:text-7xl lg:text-5xl">
            <h2>Bem-vindo a</h2>
          </div>
          <div className="animate-gradient bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] bg-clip-text text-6xl font-semibold text-transparent md:text-7xl">
            <AnimatedText text="StellioCode" />
          </div>

          <p className="mt-2 text-left font-mono text-2xl md:text-3xl xl:text-2xl">
            Inspiração que vira inovação.{" "}
          </p>

          <motion.div
            whileHover={{
              scale: 1.02,
              x: 13,
              y: 3,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            whileTap={{
              scale: 1.1,
            }}
          >
            <Button
              variant="secondary"
              className="text-1xl z-50 overflow-hidden bg-gradient-to-r from-sky-500 to-fuchsia-400 text-white transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <span className="bg-shine animate-shine absolute left-[-100%] top-0 h-full w-full font-mono"></span>
              Marque uma reunião!
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

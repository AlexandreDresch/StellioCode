import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, TerminalIcon } from "lucide-react";
import { motion } from "framer-motion";

export function BentoCard({
  title,
  index,
  backgroundImage,
  description,
  href,
}: {
  title: string;
  index: number;
  backgroundImage: string;
  description: string;
  href: string;
}) {
  const classes = [
    {
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
      isTall: true,
      isMedium: false,
    },
    {
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
      isTall: false,
      isMedium: true,
    },
    {
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
      isTall: false,
      isMedium: false,
    },
    {
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
      isTall: false,
      isMedium: true,
    },
    {
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
      isTall: false,
      isMedium: false,
    },
  ];
  const selectedClass = classes[index % classes.length];
  const isTallCard = selectedClass.isTall;
  const isMediumCard = selectedClass.isMedium;

  return (
    <motion.div
      key={title}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-lg",
        "bg-white shadow-md",
        "transform-gpu dark:bg-black",
        selectedClass.className,
      )}
      whileHover="hover"
      initial="initial"
    >
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        <TerminalIcon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
        <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
          {title}
        </h3>
        <p className="max-w-lg text-neutral-400">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        <Button
          variant="ghost"
          asChild
          size="sm"
          className="pointer-events-auto"
        >
          <a href={href}>
            Visitar
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-end"
        variants={{
          initial: { opacity: 0, scale: 0.9 },
          hover: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <img
          src={backgroundImage}
          alt={title}
          className={cn(
            "rounded-lg object-cover shadow-sm",
            isTallCard
              ? "h-64 w-full"
              : isMediumCard
                ? "h-44 w-64"
                : "w-50 h-32",
          )}
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </motion.div>
  );
}

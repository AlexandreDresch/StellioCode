import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function PlansSkeleton() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="container py-20">
      <div className="mb-12 space-y-4 text-center">
        <Skeleton className="mx-auto h-12 w-3/4 sm:h-14" />
        <Skeleton className="mx-auto h-6 w-2/3" />
      </div>

      <div className="mb-10 flex justify-center">
        <Skeleton className="h-10 w-24 rounded-full" />
        <Skeleton className="ml-2 h-6 w-48" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {[1, 2, 3].map((_, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: index === 1 ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -30 : index === 0 ? 30 : 0,
                    scale: index === 0 || index === 2 ? 0.94 : 1.0,
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.6,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.4,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              "relative rounded-2xl border-[1px] bg-background p-6 text-center lg:flex lg:flex-col lg:justify-center",
              index === 1 ? "border-2 border-[#F76680]" : "border-border",
              "flex flex-col",
              index !== 1 && "mt-5",
              index === 0 || index === 2
                ? "-translate-z-[50px] rotate-y-[10deg] z-0 translate-x-0 translate-y-0 transform"
                : "z-10",
              index === 0 && "origin-right",
              index === 2 && "origin-left",
            )}
          >
            {index === 1 && (
              <div className="absolute right-0 top-0 flex items-center rounded-bl-xl rounded-tr-xl bg-gradient-to-bl from-[#F76680] via-[#9D2C7D] to-[#57007B] px-2 py-0.5">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="ml-1 h-4 w-16" />
              </div>
            )}
            <div className="flex flex-1 flex-col">
              <Skeleton className="mx-auto h-6 w-1/2" />
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <Skeleton className="h-12 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="mx-auto mt-2 h-4 w-32" />

              <ul className="mt-5 flex flex-col gap-2">
                {[1, 2, 3, 4].map((_, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </li>
                ))}
              </ul>

              <hr className="my-4 w-full" />

              <Skeleton className="h-12 w-full rounded-lg" />

              <Skeleton className="mx-auto mt-6 h-4 w-3/4" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

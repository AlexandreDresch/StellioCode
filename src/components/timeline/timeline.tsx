import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "../ui/badge";
import { BoxIcon } from "lucide-react";
import { AddFollowUpModal } from "../follow-up/modals/add-follow-up-modal";
import useRole from "@/hooks/auth/use-role";
import { formatDate } from "@/lib/utils";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export function Timeline({
  data,
  projectId,
}: {
  data: TimelineEntry[];
  projectId: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const role = useRole();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white p-4 font-sans dark:bg-neutral-950 md:px-4"
      ref={containerRef}
    >
      <div className="mx-auto flex w-full max-w-7xl justify-between pt-10">
        <div>
          <h2 className="mb-4 max-w-4xl text-2xl font-medium dark:text-white md:text-3xl">
            Timeline do projeto
          </h2>
          <p className="max-w-sm text-sm text-neutral-700 dark:text-neutral-300 md:text-base">
            Acompanhe o andamento do seu projeto por aqui.
          </p>
        </div>

        {role === "developer" && <AddFollowUpModal projectId={projectId} />}
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20">
            <Badge variant="outline" className="p-2">
              <BoxIcon className="text-neutral-500 dark:text-neutral-400" />
            </Badge>
            <p className="text-base text-neutral-500 dark:text-neutral-400">
              Nenhum progresso registrado ainda.
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              Aguarde atualizações dos nossos desenvolvedores.
            </p>
          </div>
        ) : (
          <>
            {data.map((item, index) => (
              <div
                key={index}
                className="flex justify-start pt-10 md:gap-10 md:pt-20"
              >
                <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
                  <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-black md:left-3">
                    <div className="h-4 w-4 rounded-full border border-neutral-300 bg-neutral-200 p-2 dark:border-neutral-700 dark:bg-neutral-800" />
                  </div>
                  <h3 className="hidden text-xl font-medium text-neutral-500 dark:text-neutral-500 md:block md:pl-20 md:text-3xl">
                    {formatDate(item.title)}
                  </h3>
                </div>

                <div className="relative w-full pl-20 pr-4 md:pl-4">
                  <h3 className="mb-4 block text-left text-2xl font-bold text-neutral-500 dark:text-neutral-500 md:hidden">
                    {item.title}
                  </h3>
                  {item.content}{" "}
                </div>
              </div>
            ))}

            <div className="flex flex-col items-center justify-center pt-10">
              <Badge variant="outline" className="p-2">
                <BoxIcon className="text-neutral-500 dark:text-neutral-400" />
              </Badge>
              <p className="mt-2 text-base text-neutral-500 dark:text-neutral-400">
                Isso é tudo por enquanto!
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                Aguarde novas atualizações.
              </p>
            </div>
          </>
        )}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] dark:via-neutral-700 md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-purple-500 from-[0%] via-blue-500 via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
}

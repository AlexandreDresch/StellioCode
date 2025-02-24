import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";
import { PricingProps } from "@/types";

export default function Plans({
  plans = [],
  view,
  title = "Simples, Transparente e Direto",
  description = "Escolha o plano que funciona para você.\nTodos os planos incluem acesso à nossa plataforma, ferramentas de monitoramento, e suporte dedicado.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  if (plans.length === 0) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Nenhum plano disponível no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-20">
      <div className="mb-12 space-y-4 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h2>
        <p className="whitespace-pre-line text-lg text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="mb-10 flex justify-center">
        <label className="relative inline-flex cursor-pointer items-center">
          <Label>
            <Switch
              ref={switchRef}
              checked={!isMonthly}
              onCheckedChange={handleToggle}
              className="relative border-transparent data-[state=checked]:bg-[#9D2C7D]"
            />
          </Label>
        </label>
        <span className="ml-2 font-semibold">
          Pagamento anual{" "}
          <span className="text-primary">(20% de desconto)</span>
        </span>
      </div>

      <div className="sm:2 grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: plan.popular ? -20 : 0,
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
              `relative rounded-2xl border-[1px] bg-background p-6 text-center lg:flex lg:flex-col lg:justify-center`,
              plan.popular ? "border-2 border-[#F76680]" : "border-border",
              "flex flex-col",
              !plan.popular && "mt-5",
              index === 0 || index === 2
                ? "-translate-z-[50px] rotate-y-[10deg] z-0 translate-x-0 translate-y-0 transform"
                : "z-10",
              index === 0 && "origin-right",
              index === 2 && "origin-left",
            )}
          >
            {plan.popular && (
              <div className="absolute right-0 top-0 flex items-center rounded-bl-xl rounded-tr-xl bg-gradient-to-bl from-[#F76680] via-[#9D2C7D] to-[#57007B] px-2 py-0.5">
                <Star className="h-4 w-4 fill-current text-primary-foreground" />
                <span className="ml-1 font-sans font-semibold text-primary-foreground">
                  Popular
                </span>
              </div>
            )}
            <div className="flex flex-1 flex-col">
              <p className="text-base font-semibold text-muted-foreground">
                {plan.name}
              </p>
              <div className="mt-6 flex items-center justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  <NumberFlow
                    value={
                      isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                    }
                    format={{
                      style: "currency",
                      currency: "BRL",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }}
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                    className="font-variant-numeric: tabular-nums"
                  />
                </span>

                <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
                  {plan.period}
                </span>
              </div>

              <p className="text-xs leading-5 text-muted-foreground">
                {isMonthly ? "cobrado mensalmente" : "cobrado anualmente"}
              </p>

              <ul className="mt-5 flex flex-col gap-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-left">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="my-4 w-full" />

              <a
                href={"/agendamento"}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                  }),
                  "group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                  "transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-[#F76680]",
                  plan.popular
                    ? "bg-gradient-to-bl from-[#F76680] via-[#9D2C7D] to-[#57007B] text-primary-foreground hover:text-primary-foreground"
                    : "bg-background text-foreground",
                )}
              >
                {view === "client" ? "Escolher Plano" : "Editar Plano"}
              </a>
              <p className="mt-6 text-xs leading-5 text-muted-foreground">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

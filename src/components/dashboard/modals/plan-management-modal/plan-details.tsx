import { Badge } from "@/components/ui/badge";
import { PricingPlan } from "@/types";
import NumberFlow from "@number-flow/react";

import {
  CalendarDaysIcon,
  CalendarRangeIcon,
  FeatherIcon,
  HandCoinsIcon,
  StarIcon,
} from "lucide-react";

export default function PlanDetails({ plan }: { plan: PricingPlan }) {
  return (
    <div className="">
      <ul className="space-y-3">
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <HandCoinsIcon size={14} />
            <span className="text-sm font-normal">Plano:</span>
          </div>

          <Badge className="bg-cyan-300 text-cyan-900 hover:bg-cyan-300">
            {plan.name}
          </Badge>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <CalendarDaysIcon size={14} />
            <span className="text-sm font-normal">Preço Mensal:</span>
          </div>

          <Badge className="bg-emerald-300 text-emerald-900 hover:bg-emerald-300">
            <NumberFlow
              value={+plan.price}
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
            /mês
          </Badge>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <CalendarRangeIcon size={14} />
            <span className="text-sm font-normal">Preço Anual:</span>
          </div>

          <Badge className="bg-fuchsia-300 text-fuchsia-900 hover:bg-fuchsia-300">
            <NumberFlow
              value={+plan.yearlyPrice}
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
            /mês
          </Badge>
        </li>

        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-1">
            <FeatherIcon size={14} />
            <span className="text-sm font-normal">Features:</span>
          </div>

          <ul className="grid list-none grid-cols-1 gap-1">
            {plan.features.map((feature) => (
              <li key={feature}>
                <Badge variant="outline" className="w-full">
                  {feature}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        {plan.popular && (
          <Badge
            className="flex items-center bg-gradient-to-bl from-[#F76680] via-[#9D2C7D] to-[#57007B] px-2 py-0.5"
            variant="outline"
          >
            <StarIcon className="h-4 w-4 fill-current text-primary-foreground" />
            <span className="ml-1 font-sans font-semibold text-primary-foreground">
              Popular
            </span>
          </Badge>
        )}
      </ul>
    </div>
  );
}

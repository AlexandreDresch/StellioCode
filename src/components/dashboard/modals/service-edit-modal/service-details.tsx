import { Badge } from "@/components/ui/badge";
import { Service } from "@/types";
import NumberFlow from "@number-flow/react";

import {
  CalendarDaysIcon,
  ChartColumnIcon,
  ClockIcon,
  HandCoinsIcon,
} from "lucide-react";

export default function ServiceDetails({ service }: { service: Service }) {
  return (
    <div className="">
      <ul className="space-y-3">
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <HandCoinsIcon size={14} />
            <span className="text-sm font-normal">Serviço:</span>
          </div>

          <Badge className="bg-cyan-300 text-cyan-900 hover:bg-cyan-300">
            {service.title}
          </Badge>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <CalendarDaysIcon size={14} />
            <span className="text-sm font-normal">Preço Base:</span>
          </div>

          <Badge className="bg-emerald-300 text-emerald-900 hover:bg-emerald-300">
            <NumberFlow
              value={+service.price}
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
          </Badge>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <ChartColumnIcon size={14} />
            <span className="text-sm font-normal">Categoria:</span>
          </div>

          <Badge className="bg-orange-300 text-orange-900 hover:bg-orange-300">
            {service.category}
          </Badge>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <ClockIcon size={14} />
            <span className="text-sm font-normal">Duração:</span>
          </div>

          <Badge className="bg-green-300 text-green-900 hover:bg-green-300">
            {service.duration}
          </Badge>
        </li>

        {service.active && (
          <Badge
            className="flex items-center bg-gradient-to-bl from-[#F76680] via-[#9D2C7D] to-[#57007B] px-2 py-0.5"
            variant="outline"
          >
            <span className="ml-1 font-sans font-semibold text-primary-foreground">
              Ativo
            </span>
          </Badge>
        )}
      </ul>
    </div>
  );
}

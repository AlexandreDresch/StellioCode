import { Badge } from "@/components/ui/badge";
import { cn, getEventStatusColor, translateEventStatus } from "@/lib/utils";
import { Meeting } from "@/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  CalendarIcon,
  ClockIcon,
  LaptopMinimalIcon,
  UserRoundIcon,
} from "lucide-react";

interface IMeetingDetails {
  client: string;
  date: Date;
  status: Meeting["status"];
}

export default function MeetingDetails({
  client,
  date,
  status,
}: IMeetingDetails) {
  const badgeColor = getEventStatusColor(status);
  return (
    <div className="">
      <ul className="space-y-3">
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <UserRoundIcon size={14} />
            <span className="text-sm font-normal">Cliente:</span>
          </div>

          <Badge className="bg-cyan-300 text-cyan-900 hover:bg-cyan-300">
            {client}
          </Badge>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <CalendarIcon size={14} />
            <span className="text-sm font-normal">Dia:</span>
          </div>

          <Badge className="bg-slate-300 text-slate-800 hover:bg-slate-300">
            {format(date, "PPP", { locale: ptBR })}
          </Badge>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <ClockIcon size={14} />
            <span className="text-sm font-normal">Hora:</span>
          </div>

          <Badge className="bg-indigo-300 text-indigo-800 hover:bg-indigo-300">
            {format(date, "HH:mm")}
          </Badge>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <LaptopMinimalIcon size={14} />
            <span className="text-sm font-normal">Status:</span>
          </div>

          <Badge className={cn("rounded-lg hover:bg-zinc-950", badgeColor)}>
            {translateEventStatus(status)}
          </Badge>
        </li>
      </ul>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import {
  cn,
  getProjectStatusColor,
  translateProjectStatus,
} from "@/lib/utils";
import { Project } from "@/types";
import {
  HandCoinsIcon,
  HardDriveIcon,
  LaptopMinimalIcon,
  UserRoundIcon,
} from "lucide-react";

interface IProjectDetails {
  client: string;
  plan: string;
  service: string;
  status: Project["status"];
}

export default function ProjectDetails({
  client,
  plan,
  service,
  status,
}: IProjectDetails) {
  const badgeColor = getProjectStatusColor(status);
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
            <HandCoinsIcon size={14} />
            <span className="text-sm font-normal">Plano:</span>
          </div>

          <Badge className="bg-slate-300 text-slate-800 hover:bg-slate-300">
            {plan}
          </Badge>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <HardDriveIcon size={14} />
            <span className="text-sm font-normal">Serviço:</span>
          </div>

          <Badge className="bg-indigo-300 text-indigo-800 hover:bg-indigo-300">
            {service}
          </Badge>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <LaptopMinimalIcon size={14} />
            <span className="text-sm font-normal">Status:</span>
          </div>

          <Badge className={cn("rounded-lg hover:bg-zinc-950", badgeColor)}>
            {translateProjectStatus(status)}
          </Badge>
        </li>
      </ul>
    </div>
  );
}

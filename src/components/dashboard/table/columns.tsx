import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  cn,
  getDeveloperStatusColor,
  getProjectStatusColor,
  translateDeveloperLevel,
  translateDeveloperStatus,
  translateProjectStatus,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import TeamEditModal from "../modals/team-edit-modal/team-edit-modal";
import { RemoveDeveloperModal } from "../modals/remove-developer-modal";
import { EditDeveloperModal } from "../modals/edit-developer-modal";

export type Project = {
  id: string;
  title: string;
  client: string;
  price: number;
  status: "pending" | "in_progress" | "completed" | "cancelled";
};

export type Developer = {
  id: string;
  name: string;
  activeProjectsCount: number;
  status: "pending" | "approved" | "rejected";
  level: "junior" | "mid_level" | "senior";
};

export function columns<T extends Project | Developer>(
  type: T extends Project ? "project" : "developer",
): ColumnDef<T>[] {
  return [
    ...(type === "project"
      ? [
          {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }: { row: Row<T> }) => {
              const status = row.getValue("status") as Project["status"];
              const formattedStatus = translateProjectStatus(status);
              const badgeColor = getProjectStatusColor(status);

              return (
                <Badge
                  className={cn("rounded-lg hover:bg-zinc-950", badgeColor)}
                >
                  {formattedStatus}
                </Badge>
              );
            },
          },
          {
            accessorKey: "title",
            header: "Projeto",
          },
          {
            accessorKey: "client",
            header: "Cliente",
          },
          {
            accessorKey: "price",
            header: ({ column }: { column: Column<T> }) => {
              return (
                <Button
                  variant="ghost"
                  className="pl-0"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  Preço
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              );
            },
            cell: ({ row }: { row: Row<T> }) => {
              const amount = parseFloat(row.getValue("price"));
              const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(amount);

              return <div className="font-medium">{formatted}</div>;
            },
          },
        ]
      : [
          {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }: { row: Row<T> }) => {
              const status = row.getValue("status") as Developer["status"];
              const formattedStatus = translateDeveloperStatus(status);
              const badgeColor = getDeveloperStatusColor(status);

              return (
                <Badge
                  className={cn("rounded-lg hover:bg-zinc-950", badgeColor)}
                >
                  {formattedStatus}
                </Badge>
              );
            },
          },
          {
            accessorKey: "name",
            header: "Nome",
          },
          {
            accessorKey: "level",
            header: "Nível",
            cell: ({ row }: { row: Row<T> }) => {
              const level = row.getValue("level") as Developer["level"];
              const levelLabel = translateDeveloperLevel(level);
              return <span>{levelLabel}</span>;
            },
          },
          {
            accessorKey: "activeProjectsCount",
            header: "Projetos Ativos",
            cell: ({ row }: { row: Row<T> }) => (
              <span className="pl-10">
                {row.getValue("activeProjectsCount")}
              </span>
            ),
          },
        ]),
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const item = row.original as T;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(item.id)}
              >
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {type === "project" ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link
                      to={`/acompanhamento/${(row.original as Project).id}`}
                      className="cursor-pointer"
                    >
                      Acompanhamento
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <TeamEditModal projectId={(row.original as Project).id} />
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <EditDeveloperModal
                      developerId={(row.original as Developer).id}
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <RemoveDeveloperModal />
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ] as ColumnDef<T>[];
}

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
  getEventStatusColor,
  getProjectStatusColor,
  translateDeveloperLevel,
  translateDeveloperStatus,
  translateEventStatus,
  translateProjectStatus,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import TeamEditModal from "../modals/team-edit-modal/team-edit-modal";
import { RemoveDeveloperModal } from "../modals/remove-developer-modal";
import { EditDeveloperModal } from "../modals/edit-developer-modal";
import { Developer, Meeting, Project } from "@/types";
import { MeetingManagementModal } from "../modals/meeting-management-modal/meeting-management-modal";

export function columns<T extends Project | Developer | Meeting>(
  type: T extends Project
    ? "project"
    : T extends Developer
      ? "developer"
      : "meeting",
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
            accessorKey: "clientName",
            header: "Cliente",
          },
          {
            accessorKey: "price",
            header: ({ column }: { column: Column<T> }) => (
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
            ),
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
      : []),
    ...(type === "developer"
      ? [
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
            accessorKey: "fullName",
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
            accessorKey: "activeProjects",
            header: "Projetos Ativos",
            cell: ({ row }: { row: Row<T> }) => (
              <span className="pl-10">{row.getValue("activeProjects")}</span>
            ),
          },
        ]
      : []),
    ...(type === "meeting"
      ? [
          {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }: { row: Row<T> }) => {
              const status = row.getValue("status") as Meeting["status"];
              const formattedStatus = translateEventStatus(
                status.toLowerCase() as Meeting["status"],
              );
              const badgeColor = getEventStatusColor(
                status.toLowerCase() as Meeting["status"],
              );

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
            accessorKey: "projectName",
            header: "Projeto",
          },
          {
            accessorKey: "clientName",
            header: "Cliente",
          },
          {
            accessorKey: "scheduledAt",
            header: "Data",
            cell: ({ row }: { row: Row<T> }) => {
              const date = row.getValue(
                "scheduledAt",
              ) as Meeting["scheduledAt"];
              const formattedDate = new Intl.DateTimeFormat("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date(date));

              return <Badge variant="outline">{formattedDate}</Badge>;
            },
          },
        ]
      : []),
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }: { row: Row<T> }) => {
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
                    <Link to={`/acompanhamento/${item.id}`}>
                      Acompanhamento
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <TeamEditModal projectId={item.id} />
                  </DropdownMenuItem>
                </>
              ) : type === "developer" ? (
                <>
                  <DropdownMenuItem asChild>
                    <EditDeveloperModal developerId={item.id} />
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <RemoveDeveloperModal />
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <MeetingManagementModal event={item as Meeting} />
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ] as ColumnDef<T>[];
}

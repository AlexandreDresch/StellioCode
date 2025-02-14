import { CalendarSearchIcon, CogIcon, ComputerIcon } from "lucide-react";

import { DataTable } from "./table/data-table";

import { Developer, Project } from "@/types";
import AreaChartGradient from "./charts/area-chart-gradient";
import BarChartComponent from "./charts/bar-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PieChartComponent } from "./charts/pie-chart";
import Calendar from "./calendar";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { mockEvents } from "@/constants/events";
import { columns } from "./table/columns";
import CountUp from "react-countup";
import useGetSummary from "@/hooks/api/useGetSummary";
import { getCurrentMonthYear } from "@/lib/utils";
import useGetAllProjectsAdmin from "@/hooks/api/useGetAllProjectsAdmin";
import useGetLastSixMonthsStats from "@/hooks/api/useGetLastSixMonthsStats";
import useGetAllDevelopers from "@/hooks/api/useGetAllDevelopers";

export default function AdminDashboard() {
  const [meetingsViewModel, setMeetingsViewModel] = useState<
    "calendar" | "list"
  >("calendar");

  const token = "";
  
  const { getSummary, summary } = useGetSummary();
  const { getAllProjectsAdmin, projects, pagination, setPagination } =
    useGetAllProjectsAdmin();
  const { projectStats, getLastSixMonthsStats } = useGetLastSixMonthsStats();
  const { getAllDevelopers, developers, devPagination, setDevPagination } =
    useGetAllDevelopers();

  useEffect(() => {
    getSummary({ token });
    getAllProjectsAdmin({ token });
    getLastSixMonthsStats({ token });
    getAllDevelopers({ token });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 sm:ml-14">
      <section className="flex gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="font-semibold">
              {getCurrentMonthYear()}
            </CardTitle>

            <CardDescription>Resumo de vendas do mês atual.</CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-32 xl:grid-cols-4">
            <Card className="max-w-full">
              <CardHeader className="flex pb-0">
                <img
                  src="/icons/sales-chart.svg"
                  alt="Increase chart icon."
                  className="size-7"
                />
                <CardTitle className="font-semibold">
                  <CountUp
                    end={summary?.totalRevenue.current || 0}
                    decimal=","
                    prefix="R$ "
                    decimals={2}
                  />
                </CardTitle>

                <CardDescription className="text-[13px] font-medium">
                  Em Vendas
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-xs font-medium text-orange-400">
                  {summary?.totalRevenue.change !== undefined &&
                  summary?.totalRevenue.change > 0
                    ? "+"
                    : ""}
                  {summary?.totalRevenue.change}% em relação ao mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="max-w-full">
              <CardHeader className="flex pb-0">
                <img
                  src="/icons/charge.svg"
                  alt="Battery icon."
                  className="size-7"
                />
                <CardTitle className="font-semibold">
                  <CountUp end={summary?.completedProjects.current || 0} />
                </CardTitle>

                <CardDescription className="text-[13px] font-medium">
                  Projetos Finalizados
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-xs font-medium text-emerald-400">
                  {summary?.completedProjects.change !== undefined &&
                  summary?.completedProjects.change > 0
                    ? "+"
                    : ""}
                  {summary?.completedProjects.change}% em relação ao mês
                  anterior
                </p>
              </CardContent>
            </Card>

            <Card className="max-w-full">
              <CardHeader className="flex pb-0">
                <img src="/icons/bag.svg" alt="Bag icon." className="size-7" />
                <CardTitle className="font-semibold">
                  <CountUp end={summary?.newProjects.current || 0} />
                </CardTitle>

                <CardDescription className="text-[13px] font-medium">
                  Novos Projetos
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-xs font-medium text-red-400">
                  {summary?.newProjects.change !== undefined &&
                  summary?.newProjects.change > 0
                    ? "+"
                    : ""}
                  {summary?.newProjects.change}% em relação ao mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="max-w-full">
              <CardHeader className="flex pb-0">
                <img
                  src="/icons/person-plus.svg"
                  alt="Increase chart icon."
                  className="size-7"
                />
                <CardTitle className="font-semibold">
                  <CountUp end={summary?.newClients.current || 0} />
                </CardTitle>

                <CardDescription className="text-[13px] font-medium">
                  Novos Clientes
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-xs font-medium text-sky-400">
                  {summary?.newClients.change !== undefined &&
                  summary?.newClients.change > 0
                    ? "+"
                    : ""}
                  {summary?.newClients.change}% em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <BarChartComponent summary={summary} />
      </section>

      <section className="mt-4 flex gap-4 max-md:flex-col">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Projetos
              </CardTitle>
              <CogIcon className="ml-auto size-4" />
            </div>
          </CardHeader>

          <CardContent>
            {projects?._embedded?.internalProjectDetailsResponseDTOList
              ?.length ? (
              <DataTable<Project>
                columns={columns<Project>("project")}
                filterPlaceholder="Filtre pelo nome do projeto"
                filterKey="title"
                entityName="project"
                data={projects._embedded.internalProjectDetailsResponseDTOList}
                pagination={pagination}
                setPagination={setPagination}
              />
            ) : (
              <div className="text-center text-muted-foreground">
                Nenhum projeto disponível.
              </div>
            )}
          </CardContent>
        </Card>

        {projectStats && <AreaChartGradient data={projectStats} />}
      </section>

      <section className="mt-4 flex gap-4 max-md:flex-col">
        <PieChartComponent />

        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Desenvolvedores
              </CardTitle>
              <ComputerIcon className="ml-auto size-4" />
            </div>
          </CardHeader>

          <CardContent>
            {developers?._embedded?.developerResponseDTOList.length ? (
              <DataTable<Developer>
                columns={columns<Developer>("developer")}
                filterPlaceholder="Filtre por nome"
                filterKey="fullName"
                entityName="developer"
                data={developers._embedded.developerResponseDTOList}
                pagination={devPagination}
                setPagination={setDevPagination}
              />
            ) : (
              <div className="text-center text-muted-foreground">
                Nenhum projeto disponível.
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="mt-4 flex flex-col gap-4">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Reuniões
              </CardTitle>
              <CalendarSearchIcon className="ml-auto size-4" />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <Select
              onValueChange={(value: "calendar" | "list") => {
                setMeetingsViewModel(value);
              }}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Selecione a visualização" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Visualização</SelectLabel>
                  <SelectItem value="calendar">Calendário</SelectItem>

                  <SelectItem value="list">Lista</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {meetingsViewModel === "calendar" ? (
              <Calendar events={mockEvents} />
            ) : (
              <></>
              // <DataTable<Event>
              //   columns={columns<Event>("event")}
              //   filterPlaceholder="Filtre por cliente"
              //   filterKey="client"
              //   entityName="event"
              //   data={mockEvents}
              // />
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

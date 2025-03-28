import {
  CalendarSearchIcon,
  CogIcon,
  ComputerIcon,
  HandCoinsIcon,
  MoreHorizontalIcon,
  RefreshCwIcon,
  ServerIcon,
  StarIcon,
} from "lucide-react";

import { DataTable } from "./table/data-table";

import { Developer, Meeting, Project } from "@/types";
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
import { columns } from "./table/columns";
import CountUp from "react-countup";
import useGetSummary from "@/hooks/api/useGetSummary";
import { getCurrentMonthYear } from "@/lib/utils";
import useGetAllProjectsAdmin from "@/hooks/api/useGetAllProjectsAdmin";
import useGetLastSixMonthsStats from "@/hooks/api/useGetLastSixMonthsStats";
import useGetAllDevelopers from "@/hooks/api/useGetAllDevelopers";
import useGetDevelopersStats from "@/hooks/api/useGetDevelopersStats";
import useGetAllMeetings from "@/hooks/api/useGetAllMeetings";
import { Button } from "../ui/button";
import Plans from "../plans";
import { PieChartInteractive } from "./charts/pie-chart-interactive";
import useGetAllPlans from "@/hooks/api/useGetAllPlans";
import PlansSkeleton from "../skeletons/plans-skeleton";
import useGetPlansStats from "@/hooks/api/useGetPlansStats";
import useToken from "@/hooks/auth/use-token";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { RemovePlanModal } from "./modals/remove-plan-modal";
import { AddPlanModal } from "./modals/add-plan-modal";
import { ServicePieChart } from "./charts/service-pie-chart";
import { Services } from "./services";
import useGetAllServices from "@/hooks/api/useGetAllServices";
import useGetServicesStats from "@/hooks/api/useGetServicesStats";
import { RemoveServiceModal } from "./modals/remove-service-modal";
import { AddServiceModal } from "./modals/add-service-modal";
import { BentoGrid } from "../bento-grid";
import { BentoCard } from "../bento-card";
import useGetAllFeaturedProjects from "@/hooks/api/useGetAllFeaturedProjects";
import { AddFeaturedProjectModal } from "./modals/add-featured-project/add-featured-project";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { RemoveFeaturedProjectModal } from "./modals/remove-featured-project-modal";
import { FeaturedProjectEditModal } from "./modals/featured-project-edit-modal/featured-project-edit-modal";

export default function AdminDashboard() {
  const [meetingsViewModel, setMeetingsViewModel] = useState<
    "calendar" | "list"
  >("list");

  const token = useToken();

  const { getSummary, summary } = useGetSummary();
  const { getAllProjectsAdmin, projects, pagination, setPagination } =
    useGetAllProjectsAdmin();
  const { projectStats, getLastSixMonthsStats } = useGetLastSixMonthsStats();
  const { getAllDevelopers, developers, devPagination, setDevPagination } =
    useGetAllDevelopers();
  const { developersStats, getDevelopersStats } = useGetDevelopersStats();
  const { getAllMeetings, meetings, meetingPagination, setMeetingPagination } =
    useGetAllMeetings();
  const { getPlans, plans, getPlansLoading } = useGetAllPlans();
  const { getPlansStats, plansStats } = useGetPlansStats();
  const { getAllServices, services, getServicesLoading } = useGetAllServices();
  const { getServicesStats, servicesStats } = useGetServicesStats();
  const { getFeaturedProjects, featuredProjects } = useGetAllFeaturedProjects();

  useEffect(() => {
    getSummary({ token });
    getAllProjectsAdmin({ token });
    getLastSixMonthsStats({ token });
    getAllDevelopers({ token });
    getDevelopersStats({ token });
    getAllMeetings({ token });
    getPlansStats({ token });
    getPlans();
    getAllServices();
    getServicesStats({ token });
    getFeaturedProjects();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleRefreshMeetings() {
    getAllMeetings({ token });
  }

  function handleRefreshDevelopers() {
    getAllDevelopers({ token });
    getDevelopersStats({ token });
  }

  function handleRefreshProjects() {
    getAllProjectsAdmin({ token });
  }

  function handleRefreshPlans() {
    getPlans();
    getPlansStats({ token });
  }

  function handleRefreshServices() {
    getAllServices();
    getServicesStats({ token });
  }

  function handleRefreshFeaturedProjects() {
    getFeaturedProjects();
  }

  return (
    <div className="p-4 max-sm:mt-14 sm:ml-14">
      <section className="flex gap-4" id="summary">
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

        {summary && <BarChartComponent summary={summary} />}
      </section>

      <section className="mt-4 flex gap-4 max-md:flex-col" id="projects">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Projetos
              </CardTitle>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="group"
                  onClick={handleRefreshProjects}
                >
                  <RefreshCwIcon className="group-hover:animate-spin" />
                </Button>
                <CogIcon className="ml-auto size-4" />
              </div>
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

      <section className="mt-4 flex gap-4 max-md:flex-col" id="developers">
        {developersStats && (
          <PieChartComponent developersStats={developersStats} />
        )}

        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Desenvolvedores
              </CardTitle>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="group"
                  onClick={handleRefreshDevelopers}
                >
                  <RefreshCwIcon className="group-hover:animate-spin" />
                </Button>
                <ComputerIcon className="ml-auto size-4" />
              </div>
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
                Nenhum desenvolvedor encontrado.
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="mt-4 flex flex-col gap-4" id="meetings">
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Reuniões
              </CardTitle>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className="group"
                  onClick={handleRefreshMeetings}
                >
                  <RefreshCwIcon className="group-hover:animate-spin" />
                </Button>
                <CalendarSearchIcon className="ml-auto size-4" />
              </div>
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

            {meetings?._embedded?.meetingResponseDTOList?.length && (
              <>
                {meetingsViewModel === "calendar" ? (
                  <Calendar
                    events={meetings?._embedded?.meetingResponseDTOList}
                  />
                ) : (
                  <DataTable<Meeting>
                    columns={columns<Meeting>("meeting")}
                    filterPlaceholder="Filtre por cliente"
                    filterKey="clientName"
                    entityName="meeting"
                    data={meetings?._embedded?.meetingResponseDTOList}
                    pagination={meetingPagination}
                    setPagination={setMeetingPagination}
                  />
                )}
              </>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="mt-4 flex gap-4 max-[1370px]:flex-col" id="plans">
        {plansStats && <PieChartInteractive plansData={plansStats} />}

        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Planos
              </CardTitle>
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menu</span>
                      <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <AddPlanModal
                        isDisabled={plans === null || plans?.length >= 3}
                      />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {plans?.map((plan) => {
                      return (
                        <DropdownMenuItem key={plan.id} asChild>
                          <RemovePlanModal plan={plan} />
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="ghost"
                  className="group"
                  onClick={handleRefreshPlans}
                >
                  <RefreshCwIcon className="group-hover:animate-spin" />
                </Button>
                <HandCoinsIcon className="ml-auto size-4" />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {getPlansLoading ? (
              <PlansSkeleton />
            ) : (
              <Plans plans={plans ? plans : []} view="dashboard" />
            )}
          </CardContent>
        </Card>
      </section>

      <section className="mt-4 flex gap-4 max-[1370px]:flex-col" id="services">
        {servicesStats && <ServicePieChart serviceStats={servicesStats} />}

        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Serviços
              </CardTitle>
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menu</span>
                      <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <AddServiceModal />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {services?.map((service) => {
                      return (
                        <DropdownMenuItem key={service.id} asChild>
                          <RemoveServiceModal service={service} />
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="ghost"
                  className="group"
                  onClick={handleRefreshServices}
                >
                  <RefreshCwIcon className="group-hover:animate-spin" />
                </Button>
                <ServerIcon className="ml-auto size-4" />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Services
              services={services ? services : []}
              isLoading={getServicesLoading}
            />
          </CardContent>
        </Card>
      </section>

      <section
        className="mt-4 flex gap-4 max-[1370px]:flex-col"
        id="featured-projects"
      >
        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Projetos Destacados
              </CardTitle>
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menu</span>
                      <MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <AddFeaturedProjectModal />
                    </DropdownMenuItem>

                    <Accordion
                      type="single"
                      collapsible
                      className="w-full px-2"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Edição</AccordionTrigger>
                        <AccordionContent>
                          {featuredProjects &&
                            featuredProjects?.map((featuredProject) => {
                              return (
                                <DropdownMenuItem
                                  key={featuredProject.projectId}
                                  asChild
                                >
                                  <FeaturedProjectEditModal
                                    featuredProject={featuredProject}
                                  />
                                </DropdownMenuItem>
                              );
                            })}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>Deleção</AccordionTrigger>
                        <AccordionContent>
                          {featuredProjects &&
                            featuredProjects?.map((featuredProject) => {
                              return (
                                <DropdownMenuItem
                                  key={featuredProject.projectId}
                                  asChild
                                >
                                  <RemoveFeaturedProjectModal
                                    featuredProject={featuredProject}
                                  />
                                </DropdownMenuItem>
                              );
                            })}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <DropdownMenuSeparator />
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="ghost"
                  className="group"
                  onClick={handleRefreshFeaturedProjects}
                >
                  <RefreshCwIcon className="group-hover:animate-spin" />
                </Button>
                <StarIcon className="ml-auto size-4" />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <BentoGrid className="lg:grid-rows-3">
              {featuredProjects &&
                featuredProjects.map((project, index) => (
                  <BentoCard
                    key={project.title}
                    backgroundImage={project.imageUrl}
                    description={project.description}
                    href={`/projetos/${project.projectId}`}
                    title={project.title}
                    index={index}
                  />
                ))}
            </BentoGrid>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

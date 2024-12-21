import { CalendarSearchIcon, CogIcon, ComputerIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { ColumnDef } from "@tanstack/react-table";

export default function AdminDashboard() {
  const chartData = [
    { month: "Janeiro", completed: 186, in_progress: 80 },
    { month: "Fevereiro", completed: 305, in_progress: 200 },
    { month: "Março", completed: 237, in_progress: 120 },
    { month: "Abril", completed: 73, in_progress: 190 },
    { month: "Maio", completed: 209, in_progress: 130 },
    { month: "Junho", completed: 214, in_progress: 140 },
  ];

  const chartConfig = {
    completed: {
      label: "Finalizados",
      color: "#2563eb",
    },
    in_progress: {
      label: "Em Progresso",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  const projectsData = [
    {
      id: "1",
      title: "Redesign de Website",
      client: "TechCorp Inc.",
      price: 1234.56,
      status: "in_progress",
    },
    {
      id: "2",
      title: "Desenvolvimento de App Mobile",
      client: "HealthPlus",
      price: 2274.56,
      status: "pending",
    },
    {
      id: "3",
      title: "Campanha de Marketing",
      client: "GreenFields",
      price: 3034.5,
      status: "completed",
    },
    {
      id: "4",
      title: "Plataforma de E-commerce",
      client: "ShopEasy",
      price: 1400.0,
      status: "cancelled",
    },
    {
      id: "5",
      title: "Migração para a Nuvem",
      client: "DataSecure",
      price: 1234.56,
      status: "in_progress",
    },
    {
      id: "6",
      title: "Estratégia para Mídias Sociais",
      client: "CreativeSolutions",
      price: 1000.56,
      status: "pending",
    },
    {
      id: "7",
      title: "Auditoria de Cibersegurança",
      client: "SecureNet",
      price: 10034.56,
      status: "completed",
    },
    {
      id: "8",
      title: "Desenvolvimento de Chatbot com IA",
      client: "SmartTalk",
      price: 4234.56,
      status: "in_progress",
    },
  ];

  return (
    <div className="p-4 sm:ml-14">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Projetos
              </CardTitle>
              <CogIcon className="ml-auto size-4" />
            </div>

            <CardDescription>
              A quantidade de projetos criados recentemente.
            </CardDescription>
          </CardHeader>

          <CardContent className="text-base font-semibold sm:text-lg">
            42
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Desenvolvedores
              </CardTitle>
              <ComputerIcon className="ml-auto size-4" />
            </div>

            <CardDescription>
              O tamanho atual da equipe StellioCode
            </CardDescription>
          </CardHeader>

          <CardContent className="text-base font-semibold sm:text-lg">
            10
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Reuniões
              </CardTitle>
              <CalendarSearchIcon className="ml-auto size-4" />
            </div>

            <CardDescription>
              Número de reuniões pendentes ou futuras.
            </CardDescription>
          </CardHeader>

          <CardContent className="text-base font-semibold sm:text-lg">
            10
          </CardContent>
        </Card>
      </section>

      <section className="mt-4 flex gap-4 max-md:flex-col">
        <Card className="md:w1/2 w-full md:max-w-xl">
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Projetos
              </CardTitle>
              <CogIcon className="ml-auto size-4" />
            </div>
          </CardHeader>

          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-52 w-full">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  tickMargin={10}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="completed"
                  fill={chartConfig.completed.color}
                  radius={4}
                />
                <Bar
                  dataKey="in_progress"
                  fill={chartConfig.in_progress.color}
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
                Clientes
              </CardTitle>
              <CogIcon className="ml-auto size-4" />
            </div>
          </CardHeader>

          <CardContent>
            <DataTable
              columns={
                columns as ColumnDef<
                  {
                    id: string;
                    title: string;
                    client: string;
                    price: number;
                    status: string;
                  },
                  unknown
                >[]
              }
              data={projectsData}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

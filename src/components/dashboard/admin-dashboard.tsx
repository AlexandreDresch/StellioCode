import { CogIcon } from "lucide-react";

import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { ColumnDef } from "@tanstack/react-table";
import AreaChartGradient from "./charts/area-chart-gradient";
import BarChartComponent from "./charts/bar-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function AdminDashboard() {
  

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
      <section className="flex gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="font-semibold">Dezembro 2024</CardTitle>

            <CardDescription>Resumo de vendas do mês atual.</CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card className="max-w-full">
              <CardHeader className="flex pb-0">
                <img
                  src="/icons/sales-chart.svg"
                  alt="Increase chart icon."
                  className="size-7"
                />
                <CardTitle className="font-semibold">R$ 5K</CardTitle>

                <CardDescription className="text-[13px] font-medium">
                  Em Vendas
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-xs font-medium text-orange-400">
                  +10% em relação a novembro
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
                <CardTitle className="font-semibold">500</CardTitle>

                <CardDescription className="text-[13px] font-medium">
                  Projetos Finalizados
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-xs font-medium text-emerald-400">
                  +8% em relação a novembro
                </p>
              </CardContent>
            </Card>

            <Card className="max-w-full">
              <CardHeader className="flex pb-0">
                <img src="/icons/bag.svg" alt="Bag icon." className="size-7" />
                <CardTitle className="font-semibold">20</CardTitle>

                <CardDescription className="text-[13px] font-medium">
                  Novos Projetos
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-xs font-medium text-red-400">
                  +5% em relação a novembro
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
                <CardTitle className="font-semibold">9</CardTitle>

                <CardDescription className="text-[13px] font-medium">
                  Novos Clientes
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-xs font-medium text-sky-400">
                  +10% em relação a novembro
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        <BarChartComponent />
      </section>

      <section className="mt-4 flex gap-4 max-md:flex-col">
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

        <AreaChartGradient />
      </section>
    </div>
  );
}

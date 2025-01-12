import { CogIcon } from "lucide-react";

import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";
import { ColumnDef } from "@tanstack/react-table";
import AreaChartGradient from "./charts/area-chart-gradient";
import BarChartComponent from "./charts/bar-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { projectsData } from "@/constants/projects";

export default function AdminDashboard() {
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
                Projetos
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

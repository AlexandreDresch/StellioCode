import { ScrollIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Summary } from "@/types";

type BarChartComponentProps = {
  summary: Summary;
};

export default function BarChartComponent({ summary }: BarChartComponentProps) {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("pt-BR", { month: "long" });

  const previousDate = new Date();
  previousDate.setMonth(previousDate.getMonth() - 1);
  const previousMonth = previousDate.toLocaleString("pt-BR", { month: "long" });

  const chartData = [
    {
      slug: "Vendas",
      [currentMonth]: summary.totalRevenue.current,
      [previousMonth]: summary.totalRevenue.previous,
    },
    {
      slug: "Finalizados",
      [currentMonth]: summary.completedProjects.current,
      [previousMonth]: summary.completedProjects.previous,
    },
    {
      slug: "N. Projetos",
      [currentMonth]: summary.newProjects.current,
      [previousMonth]: summary.newProjects.previous,
    },
    {
      slug: "N. Clientes",
      [currentMonth]: summary.newClients.current,
      [previousMonth]: summary.newClients.previous,
    },
  ];

  const chartConfig = {
    [previousMonth]: {
      label: previousMonth.charAt(0).toUpperCase() + previousMonth.slice(1),
      color: "#38bdf8",
    },
    [currentMonth]: {
      label: currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1),
      color: "#5eeeb1",
    },
  } satisfies ChartConfig;

  return (
    <Card className="hidden w-full md:block md:w-1/2 md:max-w-xl">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
            Resumo
          </CardTitle>
          <ScrollIcon className="ml-auto size-4" />
        </div>
      </CardHeader>

      <CardContent className="mt-16 xl:mt-0">
        <ChartContainer config={chartConfig} className="min-h-52 w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="slug"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar
              dataKey={currentMonth}
              fill={chartConfig[currentMonth].color}
              radius={4}
            />
            <Bar
              dataKey={previousMonth}
              fill={chartConfig[previousMonth].color}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

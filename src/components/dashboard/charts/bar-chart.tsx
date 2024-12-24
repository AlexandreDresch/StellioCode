import { CogIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function BarChartComponent() {
  const chartData = [
    { slug: "Vendas", december: 186, november: 80 },
    { slug: "Finalizados", december: 305, november: 200 },
    { slug: "N. Projetos", december: 237, november: 120 },
    { slug: "N. Clientes", december: 73, november: 190 },
  ];

  const chartConfig = {
    december: {
      label: "Dezembro",
      color: "#2563eb",
    },
    november: {
      label: "Novembro",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;
  return (
    <Card className="hidden w-full md:block md:w-1/2 md:max-w-xl">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="select-none text-lg text-gray-800 sm:text-xl">
            Resumo
          </CardTitle>
          <CogIcon className="ml-auto size-4" />
        </div>
      </CardHeader>

      <CardContent>
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
              dataKey="december"
              fill={chartConfig.december.color}
              radius={4}
            />
            <Bar
              dataKey="november"
              fill={chartConfig.november.color}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

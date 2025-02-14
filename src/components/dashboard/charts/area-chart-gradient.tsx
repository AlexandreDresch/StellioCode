import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ProjectStats } from "@/types";

interface AreaChartGradientProps {
  data: ProjectStats[];
}

const chartConfig = {
  inProgress: {
    label: "Em curso",
    color: "hsl(var(--chart-1))",
  },
  completed: {
    label: "Concluídos",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const monthNames: Record<string, string> = {
  "01": "Janeiro",
  "02": "Fevereiro",
  "03": "Março",
  "04": "Abril",
  "05": "Maio",
  "06": "Junho",
  "07": "Julho",
  "08": "Agosto",
  "09": "Setembro",
  "10": "Outubro",
  "11": "Novembro",
  "12": "Dezembro",
};

export default function AreaChartGradient({ data }: AreaChartGradientProps) {
  const formattedData = data.map(({ month, inProgress, completed }) => ({
    month: monthNames[month.split("-")[1]] || month,
    inProgress,
    completed,
  }));

  return (
    <Card className="hidden w-full md:block md:w-1/2 md:max-w-xl">
      <CardHeader>
        <CardTitle>Projetos</CardTitle>
        <CardDescription>
          Mostrando o total de projetos nos últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={formattedData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              lang="pt-BR"
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillInProgress" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-inProgress)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-inProgress)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="inProgress"
              type="natural"
              fill="url(#fillInProgress)"
              fillOpacity={0.4}
              stroke="var(--color-inProgress)"
              stackId="a"
            />
            <Area
              dataKey="completed"
              type="natural"
              fill="url(#fillCompleted)"
              fillOpacity={0.4}
              stroke="var(--color-completed)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {formattedData.length > 0
                ? `${formattedData[0].month} - ${formattedData.at(-1)?.month}`
                : "Sem dados disponíveis"}{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

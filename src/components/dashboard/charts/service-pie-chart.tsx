import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function ServicePieChart({
  serviceStats,
}: {
  serviceStats: Record<string, number>;
}) {
  const chartConfig = {
    projects: {
      label: "Projetos",
      color: "#FFFFFF",
    },
    "Desenvolvimento Web": {
      label: "Desenvolvimento Web",
      color: "#38bdf8",
    },
    "Desenvolvimento de Aplicativos Móveis": {
      label: "Desenvolvimento de Aplicativos Móveis",
      color: "#34d399",
    },
    "Chatbots e Inteligência Artificial": {
      label: "Chatbots e Inteligência Artificial",
      color: "#f87171",
    },
    "Manutenção e Suporte de Sistemas": {
      label: "Manutenção e Suporte de Sistemas",
      color: "#fb923c",
    },
  } satisfies ChartConfig;

  const chartData = Object.entries(serviceStats).map(([service, projects]) => ({
    service,
    projects,
    fill: chartConfig[service as keyof typeof chartConfig]?.color,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 pt-10">
        <CardTitle>Projetos por Serviço</CardTitle>
        <CardDescription>
          Distribuição de projetos desde o início do ano
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="projects"
              nameKey="service"
              label
              fill="#8884d8"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

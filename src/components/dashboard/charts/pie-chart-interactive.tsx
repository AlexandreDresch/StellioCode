import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IPlanStatsData } from "@/types";

const chartConfig = {
  BÁSICO: {
    label: "BÁSICO",
    color: "#38bdf8",
  },
  EMPRESARIAL: {
    label: "EMPRESARIAL",
    color: "#5eeeb1",
  },
  PROFISSIONAL: {
    label: "PROFISSIONAL",
    color: "#F87171",
  },
} satisfies ChartConfig;

export function PieChartInteractive({
  plansData,
}: {
  plansData: IPlanStatsData[];
}) {
  const id = "pie-interactive";
  const [activePlan, setActivePlan] = React.useState(plansData[0].planName);

  const activeIndex = React.useMemo(
    () => plansData.findIndex((item) => item.planName === activePlan),
    [activePlan, plansData],
  );

  const plans = React.useMemo(
    () => plansData.map((item) => item.planName),
    [plansData],
  );

  const enhancedPlansData = React.useMemo(
    () =>
      plansData.map((item) => ({
        ...item,
        fill: chartConfig[item.planName as keyof typeof chartConfig]?.color,
      })),
    [plansData],
  );

  const hasEntries = plansData[activeIndex].monthlyRevenue > 0;

  return (
    <Card data-chart={id} className="[1370px]:w-1/4 flex flex-col 2xl:w-2/6">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-col items-start space-y-2 pb-0">
        <div className="grid gap-1">
          <CardTitle>Planos</CardTitle>
          <CardDescription>Estatísticas Mensais</CardDescription>
        </div>
        <Select value={activePlan} onValueChange={setActivePlan}>
          <SelectTrigger
            className="h-7 w-full rounded-lg pl-2.5"
            aria-label="Selecione um plano"
          >
            <SelectValue placeholder="Selecione um Plano" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {plans.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: config.color,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        {hasEntries ? (
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={enhancedPlansData}
                dataKey="monthlyRevenue"
                nameKey="planName"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-xl font-bold"
                          >
                            R$
                            {plansData[
                              activeIndex
                            ].monthlyRevenue.toLocaleString()}{" "}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {plansData[activeIndex].planName}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="py-20 text-muted-foreground">
              Nenhuma entrada encontrada para o plano selecionado.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

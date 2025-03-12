import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { DevelopersStats } from "@/types"

interface PieChartProps {
  developersStats: DevelopersStats
}

export function PieChartComponent({ developersStats }: PieChartProps) {
  const chartData = React.useMemo(() => {
    if (!developersStats) return []

    return [
      { status: "Pendente", count: developersStats.developersByStatus.pending, fill: "#facc15" },
      { status: "Aprovado", count: developersStats.developersByStatus.approved, fill: "#4ade80" },
      { status: "Rejeitado", count: developersStats.developersByStatus.rejected, fill: "#f87171" },
    ]
  }, [developersStats])

  const totalDevelopers = developersStats?.totalDevelopers || 0

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Desenvolvedores Registrados</CardTitle>
        <CardDescription>Total por Status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
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
                          className="fill-foreground text-3xl font-medium"
                        >
                          {totalDevelopers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Desenvolvedor(es)
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

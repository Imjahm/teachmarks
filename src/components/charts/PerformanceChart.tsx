import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis } from "recharts"

interface PerformanceChartProps {
  data: Array<{ name: string; value: number }>
}

const chartConfig = {
  performance: {
    label: "Performance",
    theme: {
      light: "#0088FE",
      dark: "#0088FE"
    }
  }
}

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Subject Performance</h2>
      <div className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="#0088FE" />
          </BarChart>
        </ChartContainer>
      </div>
    </Card>
  )
}
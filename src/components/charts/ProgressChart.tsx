import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis } from "recharts"

interface ProgressChartProps {
  data: Array<{ month: string; progress: number }>
}

const chartConfig = {
  progress: {
    label: "Progress",
    theme: {
      light: "#00C49F",
      dark: "#00C49F"
    }
  }
}

export const ProgressChart = ({ data }: ProgressChartProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Progress Over Time</h2>
      <div className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="progress" stroke="#00C49F" />
          </LineChart>
        </ChartContainer>
      </div>
    </Card>
  )
}
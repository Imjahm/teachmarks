import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"

interface GradeDistributionChartProps {
  data: Array<{ name: string; value: number }>
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

const chartConfig = {
  grades: {
    label: "Grades",
    theme: {
      light: "#8884d8",
      dark: "#8884d8"
    }
  }
}

export const GradeDistributionChart = ({ data }: GradeDistributionChartProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Grade Distribution</h2>
      <div className="h-[300px]">
        <ChartContainer config={chartConfig}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </div>
    </Card>
  )
}
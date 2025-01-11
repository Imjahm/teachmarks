import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"

const mockSchoolData = {
  performanceData: [
    { name: "Maths", value: 85 },
    { name: "English", value: 78 },
    { name: "Science", value: 92 },
    { name: "History", value: 75 },
    { name: "Geography", value: 82 }
  ],
  progressData: [
    { month: "Jan", progress: 65 },
    { month: "Feb", progress: 70 },
    { month: "Mar", progress: 75 },
    { month: "Apr", progress: 72 },
    { month: "May", progress: 80 },
    { month: "Jun", progress: 85 }
  ],
  gradeDistribution: [
    { name: "A*", value: 15 },
    { name: "A", value: 25 },
    { name: "B", value: 30 },
    { name: "C", value: 20 },
    { name: "D", value: 10 }
  ]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

const SchoolResults = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">School Performance Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Subject Performance</h2>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                performance: {
                  theme: {
                    light: "#0088FE",
                    dark: "#0088FE"
                  }
                }
              }}
            >
              <ResponsiveContainer>
                <BarChart data={mockSchoolData.performanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <Bar dataKey="value" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Progress Over Time</h2>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                progress: {
                  theme: {
                    light: "#00C49F",
                    dark: "#00C49F"
                  }
                }
              }}
            >
              <ResponsiveContainer>
                <LineChart data={mockSchoolData.progressData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                  <Line type="monotone" dataKey="progress" stroke="#00C49F" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Grade Distribution</h2>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                grades: {
                  theme: {
                    light: "#8884d8",
                    dark: "#8884d8"
                  }
                }
              }}
            >
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={mockSchoolData.gradeDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {mockSchoolData.gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip>
                    <ChartTooltipContent />
                  </ChartTooltip>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Key Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">92%</p>
              <p className="text-sm text-gray-600">Pass Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">85%</p>
              <p className="text-sm text-gray-600">Student Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">78%</p>
              <p className="text-sm text-gray-600">University Placement</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default SchoolResults
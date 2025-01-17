import { useParams } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

const SchoolResults = () => {
  const { schoolId } = useParams()

  const { data: school, isLoading } = useQuery({
    queryKey: ['school', schoolId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('id', schoolId)
        .single()
      
      if (error) throw error
      return data
    },
  })

  if (isLoading) {
    return <div>Loading school data...</div>
  }

  if (!school) {
    return <div>School not found</div>
  }

  const performanceData = school.performance_data || []
  const progressData = school.progress_data || []
  const gradeDistribution = school.grade_distribution || []

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{school.name} - Performance Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Subject Performance</h2>
          <div className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer>
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="#0088FE" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Progress Over Time</h2>
          <div className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer>
                <LineChart data={progressData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="progress" stroke="#00C49F" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Grade Distribution</h2>
          <div className="h-[300px]">
            <ChartContainer>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">School Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Address:</p>
            <p>{school.address}</p>
          </div>
          <div>
            <p className="font-semibold">Location:</p>
            <p>Lat: {school.latitude}, Long: {school.longitude}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SchoolResults
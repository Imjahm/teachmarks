import { useParams } from "react-router-dom"
import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

const chartConfig = {
  performance: {
    label: "Performance",
    theme: {
      light: "#0088FE",
      dark: "#0088FE"
    }
  },
  progress: {
    label: "Progress",
    theme: {
      light: "#00C49F",
      dark: "#00C49F"
    }
  },
  grades: {
    label: "Grades",
    theme: {
      light: "#8884d8",
      dark: "#8884d8"
    }
  }
}

const SchoolResults = () => {
  const { schoolId } = useParams()

  const { data: school, isLoading, error } = useQuery({
    queryKey: ['school', schoolId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('id', schoolId)
        .maybeSingle()
      
      if (error) throw error
      return data
    },
  })

  if (isLoading) {
    return <div className="p-8">Loading school data...</div>
  }

  if (error) {
    return <div className="p-8 text-red-500">Error loading school data</div>
  }

  if (!school) {
    return <div className="p-8">School not found</div>
  }

  // Initialize default data if not present
  const performanceData = school.performance_data || [
    { name: 'Math', value: 75 },
    { name: 'English', value: 82 },
    { name: 'Science', value: 78 }
  ]
  
  const progressData = school.progress_data || [
    { month: 'Jan', progress: 65 },
    { month: 'Feb', progress: 70 },
    { month: 'Mar', progress: 75 },
    { month: 'Apr', progress: 80 }
  ]
  
  const gradeDistribution = school.grade_distribution || [
    { name: 'A', value: 30 },
    { name: 'B', value: 25 },
    { name: 'C', value: 20 },
    { name: 'D', value: 15 },
    { name: 'E', value: 10 }
  ]

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold">{school.name} - Performance Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Subject Performance</h2>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <BarChart data={performanceData}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="#0088FE" />
              </BarChart>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Progress Over Time</h2>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <LineChart data={progressData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="progress" stroke="#00C49F" />
              </LineChart>
            </ChartContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Grade Distribution</h2>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig}>
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
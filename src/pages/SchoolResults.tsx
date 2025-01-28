import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { PerformanceChart } from "@/components/charts/PerformanceChart"
import { ProgressChart } from "@/components/charts/ProgressChart"
import { GradeDistributionChart } from "@/components/charts/GradeDistributionChart"
import { SchoolInfo } from "@/components/school/SchoolInfo"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const SchoolResults = () => {
  const { schoolId } = useParams()

  const { data: school, isLoading: schoolLoading } = useQuery({
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

  const { data: schoolResults, isLoading: resultsLoading } = useQuery({
    queryKey: ['school-results', schoolId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('school_results')
        .select('*')
        .eq('school_id', schoolId)
        .order('date', { ascending: true })
      
      if (error) throw error
      return data
    },
  })

  const isLoading = schoolLoading || resultsLoading

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
        <Skeleton className="h-[400px]" />
      </div>
    )
  }

  if (!school) {
    return (
      <div className="p-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>School not found</AlertDescription>
        </Alert>
      </div>
    )
  }

  // Transform school results data for charts
  const performanceData = [
    { name: 'Average Performance', value: school.average_performance || 0 },
    { name: 'Graduation Rate', value: school.graduation_rate || 0 },
    { name: 'Attendance Rate', value: school.attendance_rate || 0 }
  ]
  
  const progressData = schoolResults?.map(result => ({
    month: new Date(result.date).toLocaleDateString('en-US', { month: 'short' }),
    progress: result.metric_value
  })) || []
  
  const gradeDistribution = [
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
        <PerformanceChart data={performanceData} />
        <ProgressChart data={progressData} />
        <GradeDistributionChart data={gradeDistribution} />
      </div>

      <SchoolInfo {...school} />
    </div>
  )
}

export default SchoolResults
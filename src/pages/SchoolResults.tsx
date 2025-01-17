import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { PerformanceChart } from "@/components/charts/PerformanceChart"
import { ProgressChart } from "@/components/charts/ProgressChart"
import { GradeDistributionChart } from "@/components/charts/GradeDistributionChart"
import { SchoolInfo } from "@/components/school/SchoolInfo"

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
        <PerformanceChart data={performanceData} />
        <ProgressChart data={progressData} />
        <GradeDistributionChart data={gradeDistribution} />
      </div>

      <SchoolInfo 
        name={school.name}
        address={school.address}
        latitude={school.latitude}
        longitude={school.longitude}
      />
    </div>
  )
}

export default SchoolResults
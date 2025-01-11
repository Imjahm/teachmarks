import { useState } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { StudentForm } from "@/components/students/StudentForm"
import { StudentList } from "@/components/students/StudentList"
import { PostcodeSearch } from "@/components/students/PostcodeSearch"

const Students = () => {
  const session = useSession()
  const { toast } = useToast()
  const [selectedPostcode, setSelectedPostcode] = useState<string>("")
  const [showForm, setShowForm] = useState(false)

  const { data: students, isLoading: isLoadingStudents } = useQuery({
    queryKey: ['students', session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('teacher_id', session?.user?.id)
      
      if (error) throw error
      return data || []
    },
  })

  const { data: examResults, isLoading: isLoadingExams } = useQuery({
    queryKey: ['exam_results', session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exam_results')
        .select('*')
        .eq('teacher_id', session?.user?.id)
      
      if (error) throw error

      // Group exam results by student_id
      const groupedResults = (data || []).reduce((acc, result) => {
        if (!acc[result.student_id]) {
          acc[result.student_id] = []
        }
        acc[result.student_id].push(result)
        return acc
      }, {} as Record<string, typeof data>)

      return groupedResults
    },
  })

  const isLoading = isLoadingStudents || isLoadingExams

  return (
    <div className="space-y-8 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Students</h1>
        <Button onClick={() => setShowForm(true)}>Add Student</Button>
      </div>
      
      <Card className="p-6">
        <PostcodeSearch 
          onSelect={(postcode) => setSelectedPostcode(postcode)} 
        />
      </Card>

      {showForm && (
        <StudentForm 
          onClose={() => setShowForm(false)}
          selectedPostcode={selectedPostcode}
        />
      )}

      <StudentList 
        students={students || []} 
        examResults={examResults || {}}
        isLoading={isLoading} 
      />
    </div>
  )
}

export default Students
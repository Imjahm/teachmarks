import { useState } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { StudentForm } from "@/components/students/StudentForm"
import { StudentList } from "@/components/students/StudentList"
import { SchoolForm } from "@/components/schools/SchoolForm"
import { SchoolList } from "@/components/schools/SchoolList"

const Students = () => {
  const session = useSession()
  const { toast } = useToast()
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>("")
  const [showStudentForm, setShowStudentForm] = useState(false)

  const { data: schools, isLoading: isLoadingSchools } = useQuery({
    queryKey: ['schools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('teacher_id', session?.user?.id)
      
      if (error) throw error
      return data || []
    },
  })

  const { data: students, isLoading: isLoadingStudents } = useQuery({
    queryKey: ['students', selectedSchoolId],
    queryFn: async () => {
      if (!selectedSchoolId) return []
      
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('school_id', selectedSchoolId)
      
      if (error) throw error
      return data || []
    },
    enabled: !!selectedSchoolId,
  })

  const { data: examResults, isLoading: isLoadingExams } = useQuery({
    queryKey: ['exam_results', selectedSchoolId],
    queryFn: async () => {
      if (!selectedSchoolId) return {}
      
      const { data, error } = await supabase
        .from('exam_results')
        .select('*')
        .eq('school_id', selectedSchoolId)
      
      if (error) throw error

      const groupedResults = (data || []).reduce((acc, result) => {
        if (!acc[result.student_id]) {
          acc[result.student_id] = []
        }
        acc[result.student_id].push(result)
        return acc
      }, {} as Record<string, typeof data>)

      return groupedResults
    },
    enabled: !!selectedSchoolId,
  })

  const isLoading = isLoadingStudents || isLoadingExams || isLoadingSchools

  return (
    <div className="space-y-8 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Schools & Students</h1>
        {selectedSchoolId && (
          <Button onClick={() => setShowStudentForm(true)}>Add Student</Button>
        )}
      </div>
      
      <SchoolForm />

      <SchoolList 
        schools={schools || []} 
        isLoading={isLoadingSchools}
        onSelect={setSelectedSchoolId}
      />

      {selectedSchoolId && showStudentForm && (
        <StudentForm 
          onClose={() => setShowStudentForm(false)}
          selectedSchoolId={selectedSchoolId}
        />
      )}

      {selectedSchoolId && (
        <StudentList 
          students={students || []} 
          examResults={examResults || {}}
          isLoading={isLoading} 
        />
      )}
    </div>
  )
}

export default Students
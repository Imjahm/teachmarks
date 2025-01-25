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
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch schools",
          variant: "destructive",
        })
        throw error
      }
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
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch students",
          variant: "destructive",
        })
        throw error
      }
      return data || []
    },
    enabled: !!selectedSchoolId,
  })

  const isLoading = isLoadingStudents || isLoadingSchools

  return (
    <div className="space-y-8 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Schools & Students</h1>
        {session && selectedSchoolId && (
          <Button onClick={() => setShowStudentForm(true)}>Add Student</Button>
        )}
      </div>
      
      {session && <SchoolForm />}

      <SchoolList 
        schools={schools || []} 
        isLoading={isLoadingSchools}
        onSelect={setSelectedSchoolId}
      />

      {session && selectedSchoolId && showStudentForm && (
        <StudentForm 
          onClose={() => setShowStudentForm(false)}
          selectedSchoolId={selectedSchoolId}
        />
      )}

      {selectedSchoolId && (
        <StudentList 
          students={students || []} 
          examResults={{}}
          isLoading={isLoading} 
        />
      )}
    </div>
  )
}

export default Students
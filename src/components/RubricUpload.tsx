import { useSession } from "@supabase/auth-helpers-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { RubricForm } from "@/components/forms/RubricForm"
import { supabase } from "@/integrations/supabase/client"
import { useState } from "react"

export const RubricUpload = () => {
  const session = useSession()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values: any) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to upload rubrics")
      return
    }

    setIsLoading(true)
    try {
      // Validate and parse JSON strings
      const gradeBoundaries = JSON.parse(values.gradeBoundaries)
      const criteria = JSON.parse(values.criteria)

      const { error } = await supabase
        .from("rubrics")
        .insert({
          title: values.title,
          exam_board: values.examBoard,
          grade_boundaries: gradeBoundaries,
          criteria: criteria,
          total_marks: values.totalMarks,
          teacher_id: session.user.id,
        })

      if (error) throw error

      toast.success("Rubric uploaded successfully")
      navigate("/")
    } catch (error: any) {
      toast.error(error.message || "Failed to upload rubric")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload Rubric</h1>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <RubricForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  )
}
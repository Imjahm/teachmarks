import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { Database } from "@/types/database.types"
import { RubricForm } from "./forms/RubricForm"
import { z } from "zod"

type Rubric = Database["public"]["Tables"]["rubrics"]["Insert"]

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  examBoard: z.string().min(1, "Exam board is required"),
  gradeBoundaries: z.string().min(1, "Grade boundaries are required"),
  criteria: z.string().min(1, "Criteria is required"),
  totalMarks: z.number().min(1, "Total marks must be greater than 0"),
})

export function RubricUpload() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // Parse JSON strings to objects
      const gradeBoundaries = JSON.parse(values.gradeBoundaries)
      const criteria = JSON.parse(values.criteria)

      const rubricData: Rubric = {
        title: values.title,
        exam_board: values.examBoard,
        grade_boundaries: gradeBoundaries,
        criteria: criteria,
        total_marks: values.totalMarks,
        teacher_id: (await supabase.auth.getUser()).data.user?.id!,
      }

      const { error } = await supabase
        .from("rubrics")
        .insert(rubricData)

      if (error) throw error

      toast({
        title: "Success",
        description: "Rubric has been uploaded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload rubric. Please check your input and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return <RubricForm onSubmit={onSubmit} isLoading={isLoading} />
}
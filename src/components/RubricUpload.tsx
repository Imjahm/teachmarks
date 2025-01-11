import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useSession } from "@supabase/auth-helpers-react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useState } from "react"
import { ExamBoardSelect } from "./forms/ExamBoardSelect"
import { FileUploadSection } from "./rubrics/FileUploadSection"
import { RubricFormFields } from "./rubrics/RubricFormFields"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  examBoard: z.string().min(1, "Exam board is required"),
  subject: z.string().min(1, "Subject is required"),
  total_marks: z.coerce.number().min(1, "Total marks must be greater than 0"),
  grade_boundaries: z.string().transform((val) => {
    try {
      return JSON.parse(val)
    } catch {
      throw new Error("Invalid JSON format")
    }
  }),
  criteria: z.string().transform((val) => {
    try {
      return JSON.parse(val)
    } catch {
      throw new Error("Invalid JSON format")
    }
  }),
})

export const RubricUpload = () => {
  const navigate = useNavigate()
  const session = useSession()
  const [selectedBoard, setSelectedBoard] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      examBoard: "",
      subject: "",
      total_marks: 0,
      grade_boundaries: "{}",
      criteria: "[]",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase.from("rubrics").insert({
        title: values.title,
        exam_board: values.examBoard,
        total_marks: values.total_marks,
        grade_boundaries: values.grade_boundaries,
        criteria: values.criteria,
        teacher_id: session?.user?.id,
      })

      if (error) throw error

      toast.success("Rubric created successfully")
      navigate("/rubrics")
    } catch (error) {
      console.error("Error creating rubric:", error)
      toast.error("Failed to create rubric")
    }
  }

  const handleProcessedContent = (data: { grade_boundaries: string, criteria: string }) => {
    form.setValue('grade_boundaries', data.grade_boundaries)
    form.setValue('criteria', data.criteria)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate("/rubrics")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Rubrics
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Create New Rubric</h1>
          <p className="text-muted-foreground">
            Upload a new rubric with grade boundaries and criteria
          </p>
        </div>

        <FileUploadSection onProcessed={handleProcessedContent} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <ExamBoardSelect 
              form={form} 
              selectedBoard={selectedBoard} 
              onBoardChange={setSelectedBoard} 
            />
            
            <RubricFormFields form={form} />

            <Button type="submit">Create Rubric</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
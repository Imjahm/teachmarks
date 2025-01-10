import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useState } from "react"
import { ExamBoardSelect } from "./ExamBoardSelect"
import { RubricDetailsFields } from "./RubricDetailsFields"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  examBoard: z.string().min(1, "Exam board is required"),
  subject: z.string().min(1, "Subject is required"),
  gradeBoundaries: z.string().min(1, "Grade boundaries are required"),
  criteria: z.string().min(1, "Criteria is required"),
  totalMarks: z.number().min(1, "Total marks must be greater than 0"),
})

type RubricFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>
  isLoading: boolean
}

export function RubricForm({ onSubmit, isLoading }: RubricFormProps) {
  const [selectedBoard, setSelectedBoard] = useState("")
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      examBoard: "",
      subject: "",
      gradeBoundaries: "",
      criteria: "",
      totalMarks: 100,
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ExamBoardSelect 
          form={form} 
          selectedBoard={selectedBoard} 
          onBoardChange={setSelectedBoard} 
        />
        
        <RubricDetailsFields form={form} />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload Rubric"}
        </Button>
      </form>
    </Form>
  )
}
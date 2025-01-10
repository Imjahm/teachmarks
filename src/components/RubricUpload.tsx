import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/integrations/supabase/client"

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      examBoard: "",
      gradeBoundaries: "",
      criteria: "",
      totalMarks: 100,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      // Parse JSON strings to objects
      const gradeBoundaries = JSON.parse(values.gradeBoundaries)
      const criteria = JSON.parse(values.criteria)

      const { error } = await supabase.from("rubrics").insert({
        title: values.title,
        exam_board: values.examBoard,
        grade_boundaries: gradeBoundaries,
        criteria: criteria,
        total_marks: values.totalMarks,
        teacher_id: (await supabase.auth.getUser()).data.user?.id,
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Rubric has been uploaded successfully",
      })
      form.reset()
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter rubric title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="examBoard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exam Board</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam board" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="AQA">AQA</SelectItem>
                  <SelectItem value="Edexcel">Edexcel</SelectItem>
                  <SelectItem value="OCR">OCR</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gradeBoundaries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade Boundaries (JSON)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='{"A*": 90, "A": 80, "B": 70, "C": 60, "D": 50, "E": 40, "F": 30}'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="criteria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Criteria (JSON)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='{"Grammar": 20, "Content": 30, "Structure": 25, "Spelling": 25}'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalMarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Marks</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload Rubric"}
        </Button>
      </form>
    </Form>
  )
}
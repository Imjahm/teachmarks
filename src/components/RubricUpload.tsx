import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useSession } from "@supabase/auth-helpers-react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  exam_board: z.string().min(1, "Exam board is required"),
  total_marks: z.string().transform((val) => parseInt(val, 10)),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      exam_board: "",
      total_marks: "",
      grade_boundaries: "{}",
      criteria: "{}",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase.from("rubrics").insert({
        ...values,
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
              name="exam_board"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exam Board</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter exam board" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="total_marks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Marks</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter total marks"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="grade_boundaries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Boundaries (JSON)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='{"A": 80, "B": 70, "C": 60}'
                      className="font-mono"
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
                      placeholder='[{"name": "Analysis", "marks": 20}, {"name": "Evaluation", "marks": 30}]'
                      className="font-mono"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Create Rubric</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
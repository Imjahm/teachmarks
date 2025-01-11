import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  examBoard: z.string().min(1, "Exam board is required"),
  subject: z.string().min(1, "Subject is required"),
  total_marks: z.coerce.number().min(1, "Total marks must be greater than 0"),
  grade_boundaries: z.string(),
  criteria: z.string(),
})

interface RubricFormFieldsProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
}

export const RubricFormFields = ({ form }: RubricFormFieldsProps) => {
  return (
    <>
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
        name="total_marks"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Total Marks</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter total marks"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
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
    </>
  )
}
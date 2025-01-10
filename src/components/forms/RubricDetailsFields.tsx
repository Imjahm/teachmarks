import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  gradeBoundaries: z.string().min(1, "Grade boundaries are required"),
  criteria: z.string().min(1, "Criteria is required"),
  totalMarks: z.number().min(1, "Total marks must be greater than 0"),
})

type RubricDetailsFieldsProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>
}

export function RubricDetailsFields({ form }: RubricDetailsFieldsProps) {
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
    </>
  )
}
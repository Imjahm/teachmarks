import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
})

type SubjectSelectProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>
  subjects: readonly string[] | string[]
  disabled?: boolean
}

export function SubjectSelect({ form, subjects, disabled }: SubjectSelectProps) {
  return (
    <FormField
      control={form.control}
      name="subject"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Subject</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            value={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
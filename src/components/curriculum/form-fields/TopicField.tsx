import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { CurriculumFormValues } from "@/types/curriculum"

interface TopicFieldProps {
  form: UseFormReturn<CurriculumFormValues>
}

export const TopicField = ({ form }: TopicFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="topic"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Topic</FormLabel>
          <FormControl>
            <Input placeholder="e.g. Linear Equations" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
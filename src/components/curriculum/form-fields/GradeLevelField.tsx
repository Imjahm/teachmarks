import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { CurriculumFormValues } from "@/types/curriculum"

interface GradeLevelFieldProps {
  form: UseFormReturn<CurriculumFormValues>
}

export const GradeLevelField = ({ form }: GradeLevelFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="gradeLevel"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Grade Level</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select grade level" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {[...Array(12)].map((_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  Grade {i + 1}
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
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { examBoards } from "@/data/examBoards"

const formSchema = z.object({
  examBoard: z.string().min(1, "Exam board is required"),
  subject: z.string().min(1, "Subject is required"),
})

type ExamBoardSelectProps = {
  form: UseFormReturn<z.infer<typeof formSchema>>
  selectedBoard: string
  onBoardChange: (value: string) => void
}

export function ExamBoardSelect({ form, selectedBoard, onBoardChange }: ExamBoardSelectProps) {
  const selectedBoardSubjects = examBoards.find(board => board.value === selectedBoard)?.subjects || []

  return (
    <>
      <FormField
        control={form.control}
        name="examBoard"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Exam Board</FormLabel>
            <Select 
              onValueChange={(value) => {
                field.onChange(value)
                onBoardChange(value)
                form.setValue("subject", "")
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam board" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {examBoards.map((board) => (
                  <SelectItem key={board.value} value={board.value}>
                    {board.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="subject"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subject</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value}
              disabled={!selectedBoard}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectedBoardSubjects.map((subject) => (
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
    </>
  )
}
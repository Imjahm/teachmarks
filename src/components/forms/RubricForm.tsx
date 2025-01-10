import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { examBoards } from "@/data/examBoards"
import { useState } from "react"

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

  const selectedBoardSubjects = examBoards.find(board => board.value === selectedBoard)?.subjects || []

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
              <Select 
                onValueChange={(value) => {
                  field.onChange(value)
                  setSelectedBoard(value)
                  form.setValue("subject", "") // Reset subject when board changes
                }} 
                defaultValue={field.value}
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
                defaultValue={field.value}
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
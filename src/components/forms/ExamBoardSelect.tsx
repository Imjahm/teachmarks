import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { examBoards } from "@/data/examBoards"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

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
  const [open, setOpen] = useState(false)
  const selectedBoardSubjects = examBoards.find(board => board.value === selectedBoard)?.subjects || []

  return (
    <>
      <FormField
        control={form.control}
        name="examBoard"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Exam Board</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {field.value
                      ? examBoards.find((board) => board.value === field.value)?.label
                      : "Select exam board..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search exam board..." />
                  <CommandEmpty>No exam board found.</CommandEmpty>
                  <CommandGroup>
                    {examBoards.map((board) => (
                      <CommandItem
                        key={board.value}
                        value={board.value}
                        onSelect={(currentValue) => {
                          const value = currentValue === field.value ? "" : currentValue
                          field.onChange(value)
                          onBoardChange(value)
                          form.setValue("subject", "") // Reset subject when board changes
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === board.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {board.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
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
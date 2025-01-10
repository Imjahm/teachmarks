import React from "react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form"

interface CurriculumFieldProps {
  form: UseFormReturn<any>
  curricula: string[]
}

export const CurriculumField = ({ form, curricula }: CurriculumFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="curriculum"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Curriculum</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value || "Select curriculum"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search curriculum..." />
                <CommandEmpty>No curriculum found.</CommandEmpty>
                <CommandGroup>
                  {curricula.map((curriculum) => (
                    <CommandItem
                      key={curriculum}
                      value={curriculum}
                      onSelect={() => {
                        form.setValue("curriculum", curriculum)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === curriculum ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {curriculum}
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
  )
}
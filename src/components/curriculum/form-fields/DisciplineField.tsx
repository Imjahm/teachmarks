import React from "react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form"

interface DisciplineFieldProps {
  form: UseFormReturn<any>
  disciplines: string[]
}

export const DisciplineField = ({ form, disciplines }: DisciplineFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="discipline"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Discipline (Optional)</FormLabel>
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
                  {field.value || "Select discipline"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search discipline..." />
                <CommandEmpty>No discipline found.</CommandEmpty>
                <CommandGroup>
                  {disciplines.map((discipline) => (
                    <CommandItem
                      key={discipline}
                      value={discipline}
                      onSelect={() => {
                        form.setValue("discipline", discipline, { shouldValidate: true })
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === discipline ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {discipline}
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
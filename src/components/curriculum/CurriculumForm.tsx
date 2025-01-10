import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useNavigate } from "react-router-dom"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useQuery } from "@tanstack/react-query"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  curriculum: z.string().min(1, "Curriculum is required"),
  gradeLevel: z.string().min(1, "Grade level is required"),
  topic: z.string().min(1, "Topic is required"),
  discipline: z.string().optional(),
  description: z.string().optional()
})

export const CurriculumForm = () => {
  const navigate = useNavigate()
  
  const { data: subjects = [], isLoading: subjectsLoading, error: subjectsError } = useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subject_disciplines')
        .select('subject')
        .order('subject')
      
      if (error) throw error
      return [...new Set((data || []).map(item => item.subject))]
    },
  })

  const { data: disciplines = [], isLoading: disciplinesLoading, error: disciplinesError } = useQuery({
    queryKey: ['disciplines'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subject_disciplines')
        .select('discipline')
        .order('discipline')
      
      if (error) throw error
      return [...new Set((data || []).map(item => item.discipline))]
    },
  })

  const { data: curricula = [], isLoading: curriculaLoading, error: curriculaError } = useQuery({
    queryKey: ['curricula'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('curriculum_standards')
        .select('curriculum')
        .order('curriculum')
      
      if (error) throw error
      return [...new Set((data || []).map(item => item.curriculum))]
    },
  })

  // Show error toasts if any queries fail
  React.useEffect(() => {
    if (subjectsError) toast.error("Failed to load subjects")
    if (disciplinesError) toast.error("Failed to load disciplines")
    if (curriculaError) toast.error("Failed to load curricula")
  }, [subjectsError, disciplinesError, curriculaError])
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      curriculum: "",
      gradeLevel: "",
      topic: "",
      discipline: "",
      description: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase
        .from('curriculum_standards')
        .insert({
          subject: values.subject,
          curriculum: values.curriculum,
          grade_level: parseInt(values.gradeLevel),
          topic: values.topic,
          discipline: values.discipline || null,
          description: values.description || null
        })

      if (error) throw error

      toast.success("Curriculum standard created successfully")
      navigate('/curriculum')
    } catch (error) {
      console.error('Error creating curriculum standard:', error)
      toast.error("Failed to create curriculum standard")
    }
  }

  if (subjectsLoading || disciplinesLoading || curriculaLoading) {
    return <div className="flex items-center justify-center p-6">Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Create New Curriculum Standard</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
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
                        {field.value || "Select subject"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search subject..." />
                      <CommandEmpty>No subject found.</CommandEmpty>
                      <CommandGroup>
                        {subjects.map((subject) => (
                          <CommandItem
                            key={subject}
                            value={subject}
                            onSelect={() => {
                              form.setValue("subject", subject)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === subject ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {subject}
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
                              form.setValue("discipline", discipline)
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter a description of the curriculum standard"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit">Create Standard</Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/curriculum')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
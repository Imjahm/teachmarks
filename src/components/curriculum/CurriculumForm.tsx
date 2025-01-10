import React from "react"
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
import { SubjectField } from "./form-fields/SubjectField"
import { CurriculumField } from "./form-fields/CurriculumField"
import { DisciplineField } from "./form-fields/DisciplineField"
import { useCurriculumData } from "@/hooks/useCurriculumData"

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
  const { subjects, curricula, disciplines, isLoading } = useCurriculumData()
  
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

  if (isLoading) {
    return <div className="flex items-center justify-center p-6">Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Create New Curriculum Standard</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <SubjectField form={form} subjects={subjects} />
          <CurriculumField form={form} curricula={curricula} />

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

          <DisciplineField form={form} disciplines={disciplines} />

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
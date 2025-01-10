import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { SubjectField } from "./form-fields/SubjectField"
import { CurriculumField } from "./form-fields/CurriculumField"
import { DisciplineField } from "./form-fields/DisciplineField"
import { GradeLevelField } from "./form-fields/GradeLevelField"
import { TopicField } from "./form-fields/TopicField"
import { DescriptionField } from "./form-fields/DescriptionField"
import { useCurriculumData } from "@/hooks/useCurriculumData"
import { curriculumFormSchema, CurriculumFormValues } from "@/types/curriculum"

export const CurriculumForm = () => {
  const navigate = useNavigate()
  const { subjects, curricula, disciplines, isLoading } = useCurriculumData()
  
  const form = useForm<CurriculumFormValues>({
    resolver: zodResolver(curriculumFormSchema),
    defaultValues: {
      subject: "",
      curriculum: "",
      gradeLevel: "",
      topic: "",
      discipline: "",
      description: ""
    }
  })

  const onSubmit = async (values: CurriculumFormValues) => {
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

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

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
          <GradeLevelField form={form} />
          <TopicField form={form} />
          <DisciplineField form={form} disciplines={disciplines} />
          <DescriptionField form={form} />

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
import { z } from "zod"

export const curriculumFormSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  curriculum: z.string().min(1, "Curriculum is required"),
  gradeLevel: z.string().min(1, "Grade level is required"),
  topic: z.string().min(1, "Topic is required"),
  discipline: z.string().optional(),
  description: z.string().optional()
})

export type CurriculumFormValues = z.infer<typeof curriculumFormSchema>
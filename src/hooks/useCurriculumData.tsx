import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export const useCurriculumData = () => {
  const { data: subjectsData = [], isLoading: subjectsLoading, error: subjectsError } = useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subject_disciplines')
        .select('subject')
        .order('subject')
      
      if (error) throw error
      return data || []
    },
  })

  const { data: disciplinesData = [], isLoading: disciplinesLoading, error: disciplinesError } = useQuery({
    queryKey: ['disciplines'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subject_disciplines')
        .select('discipline')
        .order('discipline')
      
      if (error) throw error
      return data || []
    },
  })

  const { data: curriculaData = [], isLoading: curriculaLoading, error: curriculaError } = useQuery({
    queryKey: ['curricula'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('curriculum_standards')
        .select('curriculum')
        .order('curriculum')
      
      if (error) throw error
      return data || []
    },
  })

  if (subjectsError) toast.error("Failed to load subjects")
  if (disciplinesError) toast.error("Failed to load disciplines")
  if (curriculaError) toast.error("Failed to load curricula")

  // Safely extract unique values with proper type handling
  const subjects = Array.from(new Set(subjectsData.map(item => item.subject).filter(Boolean)))
  const disciplines = Array.from(new Set(disciplinesData.map(item => item.discipline).filter(Boolean)))
  const curricula = Array.from(new Set(curriculaData.map(item => item.curriculum).filter(Boolean)))

  return {
    subjects,
    disciplines,
    curricula,
    isLoading: subjectsLoading || disciplinesLoading || curriculaLoading,
  }
}
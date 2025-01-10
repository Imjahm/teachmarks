import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export const useCurriculumData = () => {
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

  return {
    subjects,
    disciplines,
    curricula,
    isLoading: subjectsLoading || disciplinesLoading || curriculaLoading,
  }
}
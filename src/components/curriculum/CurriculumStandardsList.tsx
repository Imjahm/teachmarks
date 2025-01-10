import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { CurriculumStandardCard } from "./CurriculumStandardCard"

export const CurriculumStandardsList = () => {
  const navigate = useNavigate()
  
  const { data: standards, isLoading } = useQuery({
    queryKey: ['curriculum-standards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('curriculum_standards')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    },
  })

  if (isLoading) {
    return <div>Loading standards...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold font-poppins">Curriculum Standards</h2>
        <Button onClick={() => navigate('/curriculum/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Add Standard
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {standards?.map((standard) => (
          <CurriculumStandardCard
            key={standard.id}
            id={standard.id}
            subject={standard.subject}
            curriculum={standard.curriculum}
            gradeLevel={standard.grade_level}
            topic={standard.topic}
            description={standard.description}
          />
        ))}
      </div>
    </div>
  )
}
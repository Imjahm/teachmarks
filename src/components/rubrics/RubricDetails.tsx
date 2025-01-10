import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { GradeBoundariesList } from "./GradeBoundaries"
import { CriteriaList } from "./CriteriaList"
import { MarkingForm } from "../marking/MarkingForm"

export function RubricDetails() {
  const { id } = useParams<{ id: string }>()

  const { data: rubric, isLoading } = useQuery({
    queryKey: ["rubric", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rubrics")
        .select("*")
        .eq("id", id)
        .single()

      if (error) throw error
      return data
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!rubric) {
    return <div>Rubric not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">{rubric.title}</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Grade Boundaries</h2>
          <GradeBoundariesList boundaries={rubric.grade_boundaries} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Marking Criteria</h2>
          <CriteriaList criteria={rubric.criteria} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Mark Student Work</h2>
          <MarkingForm
            rubricId={rubric.id}
            totalMarks={rubric.total_marks}
            gradeBoundaries={rubric.grade_boundaries}
            criteria={rubric.criteria}
          />
        </section>
      </div>
    </div>
  )
}
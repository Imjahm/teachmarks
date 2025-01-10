import { useQuery } from "@tanstack/react-query"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export const RubricDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

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
    <div className="max-w-4xl mx-auto">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => navigate("/rubrics")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Rubrics
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>{rubric.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Exam Board</h3>
            <p>{rubric.exam_board}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Grade Boundaries</h3>
            <pre className="bg-gray-100 p-4 rounded-md">
              {JSON.stringify(rubric.grade_boundaries, null, 2)}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Criteria</h3>
            <pre className="bg-gray-100 p-4 rounded-md">
              {JSON.stringify(rubric.criteria, null, 2)}
            </pre>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Total Marks</h3>
            <p>{rubric.total_marks}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
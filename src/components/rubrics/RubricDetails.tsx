import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trash, Edit } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import type { Database } from "@/types/database.types"
import { useToast } from "@/components/ui/use-toast"

type Rubric = Database["public"]["Tables"]["rubrics"]["Row"]

interface Criterion {
  name: string;
  marks: number;
  description: string;
}

interface GradeBoundaries {
  [key: string]: number;
}

export const RubricDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()

  const { data: rubric, isLoading } = useQuery({
    queryKey: ["rubrics", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rubrics")
        .select("*")
        .eq("id", id)
        .single()

      if (error) throw error
      return data as Rubric
    },
  })

  const handleDelete = async () => {
    const { error } = await supabase
      .from("rubrics")
      .delete()
      .eq("id", id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete rubric",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: "Rubric deleted successfully",
    })
    navigate("/rubrics")
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!rubric) {
    return <div>Rubric not found</div>
  }

  const criteria: Criterion[] = Array.isArray(rubric.criteria) 
    ? (rubric.criteria as any[]).map(item => ({
        name: String(item.name || ''),
        marks: Number(item.marks || 0),
        description: String(item.description || '')
      }))
    : []

  const gradeBoundaries: GradeBoundaries = 
    typeof rubric.grade_boundaries === 'object' && rubric.grade_boundaries !== null
      ? Object.entries(rubric.grade_boundaries as Record<string, any>).reduce((acc, [key, value]) => ({
          ...acc,
          [key]: typeof value === 'number' ? value : 0
        }), {} as GradeBoundaries)
      : {}

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => navigate("/rubrics")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Rubrics
        </Button>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{rubric.title}</h1>
            <p className="text-muted-foreground">
              {rubric.exam_board} • {rubric.total_marks} marks
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(`/rubrics/${id}/edit`)}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Criteria</CardTitle>
          </CardHeader>
          <CardContent>
            {criteria.length > 0 ? (
              <div className="space-y-4">
                {criteria.map((criterion, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <h3 className="font-semibold mb-2">
                      {criterion.name} ({criterion.marks} marks)
                    </h3>
                    <p className="text-muted-foreground">{criterion.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No criteria defined</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grade Boundaries</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(gradeBoundaries).length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(gradeBoundaries).map(([grade, marks]) => (
                  <div key={grade} className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">{grade}</div>
                    <div className="text-muted-foreground">{marks} marks</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No grade boundaries defined</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
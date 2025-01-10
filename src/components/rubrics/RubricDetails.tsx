import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Trash, Edit } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import type { Database } from "@/types/database.types"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { GradeCalculator } from "./GradeCalculator"
import { AIFeedback } from "./AIFeedback"
import { CriteriaList } from "./CriteriaList"
import { GradeBoundariesList } from "./GradeBoundaries"

type Rubric = Database["public"]["Tables"]["rubrics"]["Row"]

interface Criterion {
  name: string
  marks: number
  description: string
}

export const RubricDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [testMarks, setTestMarks] = useState<number>(0)
  const [feedback, setFeedback] = useState<string>("")
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false)

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

  const generateAIFeedback = async () => {
    if (!rubric) return

    setIsGeneratingFeedback(true)
    try {
      const response = await supabase.functions.invoke('generate-feedback', {
        body: { rubric, marks: testMarks }
      })

      if (response.error) throw new Error(response.error.message)
      setFeedback(response.data.feedback)
      toast({
        title: "Success",
        description: "AI feedback generated successfully",
      })
    } catch (error) {
      console.error('Error generating feedback:', error)
      toast({
        title: "Error",
        description: "Failed to generate AI feedback",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingFeedback(false)
    }
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

  const gradeBoundaries = 
    typeof rubric.grade_boundaries === 'object' && rubric.grade_boundaries !== null
      ? Object.entries(rubric.grade_boundaries as Record<string, any>).reduce((acc, [key, value]) => ({
          ...acc,
          [key]: typeof value === 'number' ? value : 0
        }), {} as Record<string, number>)
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
            <CardTitle>Grade Calculator & AI Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <GradeCalculator
                totalMarks={rubric.total_marks}
                testMarks={testMarks}
                gradeBoundaries={gradeBoundaries}
                onMarksChange={setTestMarks}
              />
              
              <AIFeedback
                feedback={feedback}
                isGenerating={isGeneratingFeedback}
                onGenerate={generateAIFeedback}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Criteria</CardTitle>
          </CardHeader>
          <CardContent>
            <CriteriaList criteria={criteria} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grade Boundaries</CardTitle>
          </CardHeader>
          <CardContent>
            <GradeBoundariesList boundaries={gradeBoundaries} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
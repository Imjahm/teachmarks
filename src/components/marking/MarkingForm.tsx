import { useState } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { calculateGrade } from "@/utils/gradeCalculation"
import { GradeCalculator } from "@/components/rubrics/GradeCalculator"
import { CriteriaList } from "@/components/rubrics/CriteriaList"
import { GradeBoundariesUpload } from "@/components/upload/GradeBoundariesUpload"

interface MarkingFormProps {
  rubricId: string
  totalMarks: number
  gradeBoundaries: Record<string, number>
  criteria: Array<{ name: string; marks: number; description?: string }>
}

export function MarkingForm({ rubricId, totalMarks, gradeBoundaries: initialGradeBoundaries, criteria: initialCriteria }: MarkingFormProps) {
  const session = useSession()
  const [studentName, setStudentName] = useState("")
  const [marks, setMarks] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [criteriaMarks, setCriteriaMarks] = useState<Record<string, number>>({})
  const [gradeBoundaries, setGradeBoundaries] = useState(initialGradeBoundaries)
  const [criteria, setCriteria] = useState(initialCriteria)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session?.user?.id) {
      toast.error("You must be logged in to submit marks")
      return
    }

    const grade = calculateGrade(marks, gradeBoundaries)

    try {
      const { error } = await supabase.from("marking").insert({
        teacher_id: session.user.id,
        rubric_id: rubricId,
        student_name: studentName,
        marks,
        feedback,
        grade,
        criteria_marks: criteriaMarks,
      })

      if (error) throw error

      toast.success("Marks submitted successfully")
      setStudentName("")
      setMarks(0)
      setFeedback("")
      setCriteriaMarks({})
    } catch (error) {
      console.error("Error submitting marks:", error)
      toast.error("Failed to submit marks")
    }
  }

  const handleCriterionMarksChange = (criterionName: string, value: number) => {
    setCriteriaMarks(prev => ({
      ...prev,
      [criterionName]: value
    }))

    // Update total marks
    const newCriteriaMarks = {
      ...criteriaMarks,
      [criterionName]: value
    }
    const totalCriteriaMarks = Object.values(newCriteriaMarks).reduce((sum, mark) => sum + mark, 0)
    setMarks(totalCriteriaMarks)
  }

  const handleProcessedContent = (data: { gradeBoundaries: Record<string, number>, criteria: Array<{ name: string, marks: number }> }) => {
    setGradeBoundaries(data.gradeBoundaries)
    setCriteria(data.criteria)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <GradeBoundariesUpload onProcessed={handleProcessedContent} />

      <div>
        <label htmlFor="studentName" className="block text-sm font-medium mb-2">
          Student Name
        </label>
        <Input
          id="studentName"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Criteria Marking</h3>
        {criteria.map((criterion) => (
          <div key={criterion.name} className="space-y-2">
            <label className="block text-sm font-medium">
              {criterion.name} (Max: {criterion.marks} marks)
            </label>
            <Input
              type="number"
              min={0}
              max={criterion.marks}
              value={criteriaMarks[criterion.name] || 0}
              onChange={(e) => handleCriterionMarksChange(criterion.name, Number(e.target.value))}
            />
          </div>
        ))}
      </div>

      <GradeCalculator
        totalMarks={totalMarks}
        testMarks={marks}
        gradeBoundaries={gradeBoundaries}
        onMarksChange={setMarks}
      />

      <div>
        <label htmlFor="feedback" className="block text-sm font-medium mb-2">
          Feedback
        </label>
        <Textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
        />
      </div>

      <Button type="submit">Submit Marks</Button>
    </form>
  )
}
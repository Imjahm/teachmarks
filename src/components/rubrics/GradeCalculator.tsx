import { Input } from "@/components/ui/input"
import { calculateGrade } from "@/utils/gradeCalculation"

interface GradeCalculatorProps {
  totalMarks: number
  testMarks: number
  gradeBoundaries: Record<string, number>
  onMarksChange: (marks: number) => void
}

export const GradeCalculator = ({
  totalMarks,
  testMarks,
  gradeBoundaries,
  onMarksChange,
}: GradeCalculatorProps) => {
  const calculatedGrade = calculateGrade(testMarks, gradeBoundaries)

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <Input
          type="number"
          value={testMarks}
          onChange={(e) => onMarksChange(Number(e.target.value))}
          min={0}
          max={totalMarks}
          placeholder="Enter marks to calculate grade"
        />
      </div>
      <div className="text-2xl font-bold">
        Grade: {calculatedGrade}
      </div>
    </div>
  )
}
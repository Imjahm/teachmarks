import { Card } from "@/components/ui/card"

interface Student {
  id: string
  name: string
  age: number
  class: string
  postcode: string
  exam_results: Array<{
    id: string
    score: number
    feedback: string
  }>
}

interface StudentListProps {
  students: Student[]
  isLoading: boolean
}

export const StudentList = ({ students, isLoading }: StudentListProps) => {
  if (isLoading) {
    return <div>Loading students...</div>
  }

  if (!students.length) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        No students found. Add a student to get started.
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {students.map((student) => (
        <Card key={student.id} className="p-6">
          <h3 className="font-semibold text-lg mb-2">{student.name}</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Age: {student.age}</p>
            <p>Class: {student.class}</p>
            <p>Postcode: {student.postcode}</p>
          </div>
          {student.exam_results.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">Exam Results</h4>
              <div className="space-y-1">
                {student.exam_results.map((result) => (
                  <div key={result.id} className="text-sm">
                    <span>Score: {result.score}</span>
                    {result.feedback && (
                      <p className="text-xs text-muted-foreground">
                        {result.feedback}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
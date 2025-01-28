interface StatisticsSectionProps {
  total_students?: number
  student_teacher_ratio?: number
  total_teachers?: number
}

export const StatisticsSection = ({
  total_students,
  student_teacher_ratio,
  total_teachers
}: StatisticsSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {total_students !== undefined && (
          <div>
            <p className="font-medium">Total Students:</p>
            <p className="text-muted-foreground">{total_students}</p>
          </div>
        )}
        {student_teacher_ratio !== undefined && (
          <div>
            <p className="font-medium">Student-Teacher Ratio:</p>
            <p className="text-muted-foreground">{student_teacher_ratio}:1</p>
          </div>
        )}
        {total_teachers !== undefined && (
          <div>
            <p className="font-medium">Total Teachers:</p>
            <p className="text-muted-foreground">{total_teachers}</p>
          </div>
        )}
      </div>
    </div>
  )
}
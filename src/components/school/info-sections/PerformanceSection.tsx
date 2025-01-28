interface PerformanceSectionProps {
  average_performance?: number
  graduation_rate?: number
  attendance_rate?: number
}

export const PerformanceSection = ({
  average_performance,
  graduation_rate,
  attendance_rate
}: PerformanceSectionProps) => {
  if (!average_performance && !graduation_rate && !attendance_rate) return null

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {average_performance !== undefined && (
          <div>
            <p className="font-medium">Average Performance:</p>
            <p className="text-muted-foreground">{average_performance}%</p>
          </div>
        )}
        {graduation_rate !== undefined && (
          <div>
            <p className="font-medium">Graduation Rate:</p>
            <p className="text-muted-foreground">{graduation_rate}%</p>
          </div>
        )}
        {attendance_rate !== undefined && (
          <div>
            <p className="font-medium">Attendance Rate:</p>
            <p className="text-muted-foreground">{attendance_rate}%</p>
          </div>
        )}
      </div>
    </div>
  )
}
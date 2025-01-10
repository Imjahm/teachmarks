export const calculateGrade = (marks: number, boundaries: Record<string, number>): string => {
  const sortedGrades = Object.entries(boundaries)
    .sort(([, a], [, b]) => b - a)

  for (const [grade, boundary] of sortedGrades) {
    if (marks >= boundary) {
      return grade
    }
  }

  return 'U' // Ungraded/Fail if below all boundaries
}
export function calculateGrade(marks: number, gradeBoundaries: Record<string, number>): string {
  // Sort grade boundaries in descending order to ensure correct grade calculation
  const sortedGrades = Object.entries(gradeBoundaries)
    .sort(([, a], [, b]) => b - a);

  for (const [grade, boundary] of sortedGrades) {
    if (marks >= boundary) {
      return grade;
    }
  }

  return 'F';
}
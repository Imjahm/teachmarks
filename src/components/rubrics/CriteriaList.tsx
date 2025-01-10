interface Criterion {
  name: string
  marks: number
  description: string
}

interface CriteriaListProps {
  criteria: Criterion[]
}

export const CriteriaList = ({ criteria }: CriteriaListProps) => {
  if (criteria.length === 0) {
    return <p className="text-muted-foreground">No criteria defined</p>
  }

  return (
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
  )
}
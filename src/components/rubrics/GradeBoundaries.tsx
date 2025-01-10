interface GradeBoundariesProps {
  boundaries: Record<string, number>
}

export const GradeBoundariesList = ({ boundaries }: GradeBoundariesProps) => {
  if (Object.keys(boundaries).length === 0) {
    return <p className="text-muted-foreground">No grade boundaries defined</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(boundaries).map(([grade, marks]) => (
        <div key={grade} className="text-center p-4 border rounded-lg">
          <div className="text-2xl font-bold">{grade}</div>
          <div className="text-muted-foreground">{marks} marks</div>
        </div>
      ))}
    </div>
  )
}
interface SchoolDetailsSectionProps {
  school_type?: string
  district?: string
  grade_levels?: string
}

export const SchoolDetailsSection = ({
  school_type,
  district,
  grade_levels
}: SchoolDetailsSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">School Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {school_type && (
          <div>
            <p className="font-medium">Type:</p>
            <p className="text-muted-foreground">{school_type}</p>
          </div>
        )}
        {district && (
          <div>
            <p className="font-medium">District:</p>
            <p className="text-muted-foreground">{district}</p>
          </div>
        )}
        {grade_levels && (
          <div>
            <p className="font-medium">Grade Levels:</p>
            <p className="text-muted-foreground">{grade_levels}</p>
          </div>
        )}
      </div>
    </div>
  )
}
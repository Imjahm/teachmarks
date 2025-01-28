interface FacilitiesSectionProps {
  classrooms?: number
  labs?: number
  has_library?: boolean
  has_sports_facilities?: boolean
}

export const FacilitiesSection = ({
  classrooms,
  labs,
  has_library,
  has_sports_facilities
}: FacilitiesSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Facilities</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {classrooms !== undefined && (
          <div>
            <p className="font-medium">Classrooms:</p>
            <p className="text-muted-foreground">{classrooms}</p>
          </div>
        )}
        {labs !== undefined && (
          <div>
            <p className="font-medium">Labs:</p>
            <p className="text-muted-foreground">{labs}</p>
          </div>
        )}
        <div>
          <p className="font-medium">Facilities:</p>
          <p className="text-muted-foreground">
            {[
              has_library && 'Library',
              has_sports_facilities && 'Sports Facilities'
            ].filter(Boolean).join(', ') || 'None reported'}
          </p>
        </div>
      </div>
    </div>
  )
}
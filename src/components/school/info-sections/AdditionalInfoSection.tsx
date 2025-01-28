interface AdditionalInfoSectionProps {
  achievements?: string
  partnerships?: string
  funding_sources?: string
  annual_budget?: number
}

export const AdditionalInfoSection = ({
  achievements,
  partnerships,
  funding_sources,
  annual_budget
}: AdditionalInfoSectionProps) => {
  if (!achievements && !partnerships && !funding_sources && !annual_budget) return null

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
      <div className="space-y-4">
        {achievements && (
          <div>
            <p className="font-medium">Achievements:</p>
            <p className="text-muted-foreground">{achievements}</p>
          </div>
        )}
        {partnerships && (
          <div>
            <p className="font-medium">Partnerships:</p>
            <p className="text-muted-foreground">{partnerships}</p>
          </div>
        )}
        {funding_sources && (
          <div>
            <p className="font-medium">Funding Sources:</p>
            <p className="text-muted-foreground">{funding_sources}</p>
          </div>
        )}
        {annual_budget !== undefined && (
          <div>
            <p className="font-medium">Annual Budget:</p>
            <p className="text-muted-foreground">
              ${annual_budget.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
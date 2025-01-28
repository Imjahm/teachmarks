import { format } from "date-fns"

interface BasicInfoSectionProps {
  address: string
  latitude: number
  longitude: number
  established_date?: string
  affiliation?: string
  city?: string
  state?: string
  zip_code?: string
  country?: string
}

export const BasicInfoSection = ({
  address,
  latitude,
  longitude,
  established_date,
  affiliation,
  city,
  state,
  zip_code,
  country
}: BasicInfoSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-medium">Address:</p>
          <p className="text-muted-foreground">
            {address}
            {city && `, ${city}`}
            {state && `, ${state}`}
            {zip_code && ` ${zip_code}`}
            {country && `, ${country}`}
          </p>
        </div>
        <div>
          <p className="font-medium">Location:</p>
          <p className="text-muted-foreground">Lat: {latitude}, Long: {longitude}</p>
        </div>
        {established_date && (
          <div>
            <p className="font-medium">Established:</p>
            <p className="text-muted-foreground">
              {format(new Date(established_date), 'MMMM d, yyyy')}
            </p>
          </div>
        )}
        {affiliation && (
          <div>
            <p className="font-medium">Affiliation:</p>
            <p className="text-muted-foreground">{affiliation}</p>
          </div>
        )}
      </div>
    </div>
  )
}
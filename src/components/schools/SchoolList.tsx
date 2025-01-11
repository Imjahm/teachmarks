import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface School {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
}

interface SchoolListProps {
  schools: School[]
  isLoading: boolean
  onSelect: (schoolId: string) => void
}

export const SchoolList = ({ schools, isLoading, onSelect }: SchoolListProps) => {
  if (isLoading) {
    return <div>Loading schools...</div>
  }

  if (!schools.length) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        No schools found. Add a school to get started.
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {schools.map((school) => (
        <Card 
          key={school.id} 
          className="p-6 cursor-pointer hover:bg-accent transition-colors"
          onClick={() => onSelect(school.id)}
        >
          <h3 className="font-semibold text-lg mb-2">{school.name}</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {school.address}
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}
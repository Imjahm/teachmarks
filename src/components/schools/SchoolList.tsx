import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Users, GraduationCap, Building } from "lucide-react"
import type { Database } from "@/integrations/supabase/types"
import { Skeleton } from "@/components/ui/skeleton"

type School = Database["public"]["Tables"]["schools"]["Row"]

interface SchoolListProps {
  schools: School[]
  isLoading?: boolean
  onSelect?: (schoolId: string) => void
}

export const SchoolList = ({ schools, isLoading, onSelect }: SchoolListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex justify-end">
                <Skeleton className="h-10 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {schools.map((school) => (
        <Card key={school.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-start justify-between">
              <span className="text-xl font-bold">{school.name}</span>
              <Building className="h-6 w-6 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="text-sm">{school.address}</span>
              </div>
              {school.total_students && (
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">{school.total_students} students</span>
                </div>
              )}
              {school.grade_levels && (
                <div className="flex items-center text-muted-foreground">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  <span className="text-sm">{school.grade_levels}</span>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              {onSelect ? (
                <Button variant="outline" onClick={() => onSelect(school.id)}>
                  Select School
                </Button>
              ) : (
                <Button asChild variant="outline">
                  <Link to={`/schools/${school.id}`}>View Details</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
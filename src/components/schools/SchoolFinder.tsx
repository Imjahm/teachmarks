import { useState } from "react"
import { SchoolMap } from "@/components/schools/SchoolMap"
import { SchoolList } from "@/components/schools/SchoolList"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"

export const SchoolFinder = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const { data: schools = [], isLoading } = useQuery({
    queryKey: ['schools', searchQuery],
    queryFn: async () => {
      const query = supabase
        .from('schools')
        .select('*')
      
      if (searchQuery) {
        query.ilike('name', `%${searchQuery}%`)
      }
      
      const { data, error } = await query
      if (error) throw error
      return data || []
    },
  })

  const handleSchoolSelect = (schoolId: string) => {
    navigate(`/school-results/${schoolId}`)
  }

  const handleLocationSelect = (lat: number, lng: number) => {
    console.log("Selected location:", { lat, lng })
  }

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search schools by name..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <SchoolMap 
          schools={schools}
          onLocationSelect={handleLocationSelect}
          onSchoolSelect={handleSchoolSelect}
        />
        <SchoolList
          schools={schools}
          isLoading={isLoading}
          onSelect={handleSchoolSelect}
        />
      </div>
    </div>
  )
}
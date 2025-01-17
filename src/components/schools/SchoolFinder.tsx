import { useState } from "react"
import { SchoolMap } from "@/components/schools/SchoolMap"
import { SchoolList } from "@/components/schools/SchoolList"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"

export const SchoolFinder = () => {
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

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
        <SchoolMap onLocationSelect={handleLocationSelect} />
        <SchoolList
          schools={schools}
          isLoading={isLoading}
          onSelect={setSelectedSchoolId}
        />
      </div>
    </div>
  )
}
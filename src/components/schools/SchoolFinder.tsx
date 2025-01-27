import { useState } from "react"
import { SchoolMap } from "@/components/schools/SchoolMap"
import { SchoolList } from "@/components/schools/SchoolList"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"
import { Database } from "@/integrations/supabase/types"
import { SearchBar } from "./SearchBar"
import { SchoolFilters } from "./SchoolFilters"

type School = Database['public']['Tables']['schools']['Row']

export const SchoolFinder = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    schoolType: "",
    district: "",
    minStudents: 0,
    hasLibrary: null as boolean | null,
    hasSportsFacilities: null as boolean | null,
  })
  const navigate = useNavigate()

  const { data: schools = [], isLoading } = useQuery({
    queryKey: ['schools', searchQuery, filters],
    queryFn: async () => {
      let query = supabase
        .from('schools')
        .select('*')
      
      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`)
      }

      if (filters.schoolType) {
        query = query.eq('school_type', filters.schoolType)
      }

      if (filters.district) {
        query = query.eq('district', filters.district)
      }

      if (filters.minStudents > 0) {
        query = query.gte('total_students', filters.minStudents)
      }

      if (filters.hasLibrary !== null) {
        query = query.eq('has_library', filters.hasLibrary)
      }

      if (filters.hasSportsFacilities !== null) {
        query = query.eq('has_sports_facilities', filters.hasSportsFacilities)
      }
      
      const { data, error } = await query
      if (error) throw error
      return data || []
    },
  })

  const { data: schoolTypes = [] } = useQuery({
    queryKey: ['schoolTypes'],
    queryFn: async () => {
      const { data } = await supabase
        .from('schools')
        .select('school_type')
        .not('school_type', 'is', null) as { data: { school_type: string }[] }
      
      return Array.from(new Set((data || []).map(d => d.school_type))).filter(Boolean)
    },
  })

  const { data: districts = [] } = useQuery({
    queryKey: ['districts'],
    queryFn: async () => {
      const { data } = await supabase
        .from('schools')
        .select('district')
        .not('district', 'is', null) as { data: { district: string }[] }
      
      return Array.from(new Set((data || []).map(d => d.district))).filter(Boolean)
    },
  })

  const handleSchoolSelect = (schoolId: string) => {
    navigate(`/school-results/${schoolId}`)
  }

  const handleLocationSelect = (lat: number, lng: number) => {
    console.log("Selected location:", { lat, lng })
  }

  const resetFilters = () => {
    setFilters({
      schoolType: "",
      district: "",
      minStudents: 0,
      hasLibrary: null,
      hasSportsFacilities: null,
    })
  }

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="flex gap-4">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <SchoolFilters
            filters={filters}
            schoolTypes={schoolTypes}
            districts={districts}
            onFiltersChange={setFilters}
            onReset={resetFilters}
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
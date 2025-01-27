import { useState } from "react"
import { SchoolMap } from "@/components/schools/SchoolMap"
import { SchoolList } from "@/components/schools/SchoolList"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

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
        .not('school_type', 'is', null)
        .distinct()
      return (data || []).map(d => d.school_type).filter(Boolean)
    },
  })

  const { data: districts = [] } = useQuery({
    queryKey: ['districts'],
    queryFn: async () => {
      const { data } = await supabase
        .from('schools')
        .select('district')
        .not('district', 'is', null)
        .distinct()
      return (data || []).map(d => d.district).filter(Boolean)
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
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search schools by name..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Schools</SheetTitle>
                <SheetDescription>
                  Apply filters to find schools that match your criteria
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">School Type</label>
                  <Select
                    value={filters.schoolType}
                    onValueChange={(value) => setFilters(f => ({ ...f, schoolType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select school type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      {schoolTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">District</label>
                  <Select
                    value={filters.district}
                    onValueChange={(value) => setFilters(f => ({ ...f, district: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Districts</SelectItem>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Minimum Number of Students: {filters.minStudents}
                  </label>
                  <Slider
                    value={[filters.minStudents]}
                    onValueChange={([value]) => setFilters(f => ({ ...f, minStudents: value }))}
                    max={2000}
                    step={50}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Facilities</label>
                  <div className="space-y-2">
                    <Button
                      variant={filters.hasLibrary === true ? "default" : "outline"}
                      className="mr-2"
                      onClick={() => setFilters(f => ({ ...f, hasLibrary: f.hasLibrary === true ? null : true }))}
                    >
                      Has Library
                    </Button>
                    <Button
                      variant={filters.hasSportsFacilities === true ? "default" : "outline"}
                      onClick={() => setFilters(f => ({ 
                        ...f, 
                        hasSportsFacilities: f.hasSportsFacilities === true ? null : true 
                      }))}
                    >
                      Has Sports Facilities
                    </Button>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
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
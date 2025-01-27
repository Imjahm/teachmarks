import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Filters {
  schoolType: string
  district: string
  minStudents: number
  hasLibrary: boolean | null
  hasSportsFacilities: boolean | null
}

interface SchoolFiltersProps {
  filters: Filters
  schoolTypes: string[]
  districts: string[]
  onFiltersChange: (filters: Filters) => void
  onReset: () => void
}

export const SchoolFilters = ({
  filters,
  schoolTypes,
  districts,
  onFiltersChange,
  onReset,
}: SchoolFiltersProps) => {
  return (
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
              onValueChange={(value) =>
                onFiltersChange({ ...filters, schoolType: value })
              }
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
              onValueChange={(value) =>
                onFiltersChange({ ...filters, district: value })
              }
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
              onValueChange={([value]) =>
                onFiltersChange({ ...filters, minStudents: value })
              }
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
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    hasLibrary: filters.hasLibrary === true ? null : true,
                  })
                }
              >
                Has Library
              </Button>
              <Button
                variant={
                  filters.hasSportsFacilities === true ? "default" : "outline"
                }
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    hasSportsFacilities:
                      filters.hasSportsFacilities === true ? null : true,
                  })
                }
              >
                Has Sports Facilities
              </Button>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={onReset}>
            Reset Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
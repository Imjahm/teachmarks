import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/integrations/supabase/client"

interface School {
  id: string
  name: string
}

const Students = () => {
  const [schools, setSchools] = useState<School[]>([])
  const [selectedSchool, setSelectedSchool] = useState<string>("")

  useEffect(() => {
    const fetchSchools = async () => {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
      
      if (error) {
        console.error('Error fetching schools:', error)
        return
      }

      setSchools(data)
    }

    fetchSchools()
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Students</h1>
      
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium">Select School:</label>
            <Select value={selectedSchool} onValueChange={setSelectedSchool}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a school" />
              </SelectTrigger>
              <SelectContent>
                {schools.map((school) => (
                  <SelectItem key={school.id} value={school.id}>
                    {school.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Students
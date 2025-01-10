import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface ResourceSearchProps {
  onSearch: (query: string, filters: { subject?: string; grade?: number; type?: string }) => void;
}

export const ResourceSearch = ({ onSearch }: ResourceSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [subject, setSubject] = useState<string>()
  const [grade, setGrade] = useState<string>()
  const [type, setType] = useState<string>()

  const handleSearch = () => {
    onSearch(searchQuery, {
      subject,
      grade: grade ? parseInt(grade) : undefined,
      type
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch}>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
      <div className="flex gap-4">
        <Select onValueChange={setSubject}>
          <SelectTrigger>
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Science">Science</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setGrade}>
          <SelectTrigger>
            <SelectValue placeholder="Grade" />
          </SelectTrigger>
          <SelectContent>
            {[7, 8, 9, 10, 11, 12].map((grade) => (
              <SelectItem key={grade} value={grade.toString()}>
                Grade {grade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="worksheet">Worksheet</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="interactive">Interactive</SelectItem>
            <SelectItem value="reading">Reading</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface LessonPlanFormProps {
  subject: string
  topic: string
  yearGroup: string
  duration: string
  onSubjectChange: (value: string) => void
  onTopicChange: (value: string) => void
  onYearGroupChange: (value: string) => void
  onDurationChange: (value: string) => void
}

export const LessonPlanForm = ({
  subject,
  topic,
  yearGroup,
  duration,
  onSubjectChange,
  onTopicChange,
  onYearGroupChange,
  onDurationChange,
}: LessonPlanFormProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-6">
      <div>
        <Label htmlFor="subject">Subject</Label>
        <Select onValueChange={onSubjectChange} value={subject}>
          <SelectTrigger>
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Science">Science</SelectItem>
            <SelectItem value="History">History</SelectItem>
            <SelectItem value="Geography">Geography</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="yearGroup">Year Group</Label>
        <Select onValueChange={onYearGroupChange} value={yearGroup}>
          <SelectTrigger>
            <SelectValue placeholder="Select year group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Year 7">Year 7</SelectItem>
            <SelectItem value="Year 8">Year 8</SelectItem>
            <SelectItem value="Year 9">Year 9</SelectItem>
            <SelectItem value="Year 10">Year 10</SelectItem>
            <SelectItem value="Year 11">Year 11</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="topic">Topic</Label>
        <Input
          id="topic"
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          placeholder="Enter topic (e.g., Quadratic Equations)"
        />
      </div>

      <div>
        <Label htmlFor="duration">Duration</Label>
        <Select onValueChange={onDurationChange} value={duration}>
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1 hour">1 Hour</SelectItem>
            <SelectItem value="2 hours">2 Hours</SelectItem>
            <SelectItem value="Half term">Half Term</SelectItem>
            <SelectItem value="Full term">Full Term</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

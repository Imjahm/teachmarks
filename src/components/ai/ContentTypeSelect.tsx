import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ContentTypeSelectProps } from "./types"

export const ContentTypeSelect = ({ selectedType, onTypeChange }: ContentTypeSelectProps) => {
  return (
    <Select value={selectedType} onValueChange={(value) => onTypeChange(value as any)}>
      <SelectTrigger>
        <SelectValue placeholder="Select content type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="lesson-plan">Lesson Plan</SelectItem>
        <SelectItem value="activity">Activity</SelectItem>
        <SelectItem value="assessment">Assessment</SelectItem>
        <SelectItem value="resources">Resources</SelectItem>
      </SelectContent>
    </Select>
  )
}
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ContentTypeSelectProps } from "./types"

export const ContentTypeSelect = ({ value, onChange }: ContentTypeSelectProps) => {
  return (
    <div className="space-y-2">
      <Label>Content Type</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select content type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="lesson">Lesson Plan</SelectItem>
          <SelectItem value="examples">Real-world Examples</SelectItem>
          <SelectItem value="assessment">Assessment Questions</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
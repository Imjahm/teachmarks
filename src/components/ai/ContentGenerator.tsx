import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GeneratedContent } from "./GeneratedContent"

interface ContentGeneratorProps {
  subject: string
  topic: string
  gradeLevel: number
}

export const ContentGenerator = ({ subject, topic, gradeLevel }: ContentGeneratorProps) => {
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [promptType, setPromptType] = useState<string>("lesson")
  const [rating, setRating] = useState<number | null>(null)

  const generateContent = async () => {
    setIsGenerating(true)
    try {
      const { data, error } = await supabase.functions.invoke('generate-educational-content', {
        body: { subject, topic, gradeLevel, promptType }
      })

      if (error) throw error

      setGeneratedContent(data.content)
      toast.success("Content generated successfully!")
    } catch (error) {
      console.error("Error generating content:", error)
      toast.error("Failed to generate content")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRating = async (newRating: number) => {
    setRating(newRating)
    toast.success("Thank you for your feedback!")
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <Label>Content Type</Label>
        <Select value={promptType} onValueChange={setPromptType}>
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

      <Button 
        onClick={generateContent} 
        disabled={isGenerating}
        className="w-full"
      >
        {isGenerating ? "Generating..." : "Generate Content"}
      </Button>

      {generatedContent && (
        <GeneratedContent
          content={generatedContent}
          rating={rating}
          onRate={handleRating}
        />
      )}
    </Card>
  )
}
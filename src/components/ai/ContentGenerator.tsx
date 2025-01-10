import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ContentTypeSelect } from "./ContentTypeSelect"
import { GeneratedContent } from "./GeneratedContent"
import { ContentRating } from "./ContentRating"
import { ContentGeneratorProps, PromptType } from "./types"
import { supabase } from "@/integrations/supabase/client"
import { toast } from "sonner"

export const ContentGenerator = ({ subject, topic, gradeLevel }: ContentGeneratorProps) => {
  const [selectedType, setSelectedType] = useState<PromptType>("lesson-plan")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [rating, setRating] = useState<number>()

  const generateContent = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('generate-educational-content', {
        body: { 
          type: selectedType,
          subject,
          topic,
          gradeLevel
        }
      })

      if (error) throw error

      setContent(data.content)
      toast.success("Content generated successfully!")
    } catch (error) {
      console.error("Error generating content:", error)
      toast.error("Failed to generate content")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRating = async (rating: number) => {
    setRating(rating)
    toast.success("Thank you for your feedback!")
  }

  return (
    <Card className="p-6 space-y-4">
      <ContentTypeSelect
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />
      <GeneratedContent
        content={content}
        isLoading={isLoading}
      />
      {content && (
        <ContentRating
          rating={rating}
          onRate={handleRating}
        />
      )}
    </Card>
  )
}
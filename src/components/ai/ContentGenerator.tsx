import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { ContentGeneratorProps, PromptType } from "./types"
import { ContentTypeSelect } from "./ContentTypeSelect"
import { GeneratedContent } from "./GeneratedContent"

export const ContentGenerator = ({ subject, topic, gradeLevel }: ContentGeneratorProps) => {
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [promptType, setPromptType] = useState<PromptType>("lesson")
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
      toast.error("Failed to generate content. Please try again.")
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
      <ContentTypeSelect value={promptType} onChange={setPromptType} />

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
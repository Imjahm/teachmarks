import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from "lucide-react"

interface AIFeedbackProps {
  feedback: string
  isGenerating: boolean
  onGenerate: () => void
}

export const AIFeedback = ({
  feedback,
  isGenerating,
  onGenerate,
}: AIFeedbackProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button 
          onClick={onGenerate} 
          disabled={isGenerating}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isGenerating ? "Generating..." : "Generate AI Feedback"}
        </Button>
      </div>

      {feedback && (
        <Textarea
          value={feedback}
          readOnly
          className="h-48 mt-4"
        />
      )}
    </div>
  )
}
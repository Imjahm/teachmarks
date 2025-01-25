import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface GeneratedContentProps {
  content: string
  isGenerating: boolean
  onGenerate: () => void
  type: 'lesson-plan' | 'scheme-of-work'
}

export const GeneratedContent = ({
  content,
  isGenerating,
  onGenerate,
  type
}: GeneratedContentProps) => {
  return (
    <div className="space-y-4">
      <Button 
        onClick={onGenerate} 
        disabled={isGenerating}
        className="w-full"
      >
        {isGenerating ? "Generating..." : `Generate ${type === 'lesson-plan' ? 'Lesson Plan' : 'Scheme of Work'}`}
      </Button>

      {content && (
        <div className="mt-4">
          <Label>Generated {type === 'lesson-plan' ? 'Lesson Plan' : 'Scheme of Work'}</Label>
          <Textarea
            value={content}
            readOnly
            className="h-[400px] mt-2"
          />
        </div>
      )}
    </div>
  )
}
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GeneratedContentProps } from "./types"
import { Loader2 } from "lucide-react"

export const GeneratedContent = ({ content, isLoading }: GeneratedContentProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  if (!content) {
    return null
  }

  return (
    <div className="space-y-4">
      <Textarea
        value={content}
        readOnly
        className="h-[200px]"
      />
      <Button
        variant="outline"
        onClick={() => {
          navigator.clipboard.writeText(content)
        }}
      >
        Copy to Clipboard
      </Button>
    </div>
  )
}
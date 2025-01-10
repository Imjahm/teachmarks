import { Textarea } from "@/components/ui/textarea"
import { ContentRating } from "./ContentRating"

interface GeneratedContentProps {
  content: string
  rating: number | null
  onRate: (rating: number) => void
}

export const GeneratedContent = ({ content, rating, onRate }: GeneratedContentProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        value={content}
        readOnly
        className="h-[400px] mt-2"
      />
      <ContentRating rating={rating} onRate={onRate} />
    </div>
  )
}
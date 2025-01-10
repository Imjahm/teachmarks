import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ContentRatingProps } from "./types"

export const ContentRating = ({ rating, onRate }: ContentRatingProps) => {
  return (
    <div className="space-y-2">
      <Label>Rate this content</Label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Button
            key={star}
            variant={rating === star ? "default" : "outline"}
            size="sm"
            onClick={() => onRate(star)}
          >
            {star}
          </Button>
        ))}
      </div>
    </div>
  )
}
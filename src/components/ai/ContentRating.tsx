import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { ContentRatingProps } from "./types"

export const ContentRating = ({ onRate, rating }: ContentRatingProps) => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">How helpful was this content?</p>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <Button
            key={value}
            variant={rating === value ? "default" : "outline"}
            size="sm"
            onClick={() => onRate(value)}
          >
            <Star className={`w-4 h-4 ${rating === value ? "fill-current" : ""}`} />
          </Button>
        ))}
      </div>
    </div>
  )
}
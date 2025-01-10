import { Message } from "./types"
import { Button } from "@/components/ui/button"

interface MessageListProps {
  messages: Message[]
  onFeedback: (messageIndex: number, rating: number) => void
}

export const MessageList = ({ messages, onFeedback }: MessageListProps) => {
  return (
    <div className="space-y-4 h-[calc(100%-8rem)] overflow-y-auto">
      {messages.map((message, index) => (
        <div key={index} className="space-y-2">
          <div className="bg-muted p-3 rounded-lg">
            <p className="font-medium">You:</p>
            <p>{message.query}</p>
            {message.context?.section && (
              <p className="text-sm text-muted-foreground mt-1">
                Context: {message.context.section}
                {message.context.subject && ` | ${message.context.subject}`}
                {message.context.gradeLevel && ` | Grade ${message.context.gradeLevel}`}
              </p>
            )}
          </div>
          <div className="bg-primary/10 p-3 rounded-lg">
            <p className="font-medium">Assistant:</p>
            <p className="whitespace-pre-wrap">{message.response}</p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                variant={message.feedback === rating ? "default" : "outline"}
                size="sm"
                onClick={() => onFeedback(index, rating)}
              >
                {rating}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
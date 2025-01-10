import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2 } from "lucide-react"

interface MessageInputProps {
  query: string
  isLoading: boolean
  placeholder: string
  onQueryChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export const MessageInput = ({ 
  query, 
  isLoading, 
  placeholder,
  onQueryChange,
  onSubmit 
}: MessageInputProps) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Thinking...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send
          </>
        )}
      </Button>
    </form>
  )
}
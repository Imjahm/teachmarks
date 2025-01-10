import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { MessageCircle, Send } from "lucide-react"

interface Message {
  query: string
  response: string
  feedback?: number
}

interface TeacherBotProps {
  subject?: string
  gradeLevel?: number
}

export const TeacherBot = ({ subject, gradeLevel }: TeacherBotProps) => {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('ai-teacher-bot', {
        body: { 
          query,
          context: {
            subject,
            gradeLevel,
            previousInteractions: messages
          }
        }
      })

      if (error) throw error

      setMessages(prev => [...prev, { query, response: data.response }])
      setQuery("")
      toast.success("Response generated successfully!")
    } catch (error) {
      console.error("Error getting bot response:", error)
      toast.error("Failed to get response. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFeedback = async (messageIndex: number, rating: number) => {
    setMessages(prev => prev.map((msg, i) => 
      i === messageIndex ? { ...msg, feedback: rating } : msg
    ))
    toast.success("Thank you for your feedback!")
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5" />
        <h2 className="text-lg font-semibold">AI Teaching Assistant</h2>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="space-y-2">
            <div className="bg-muted p-3 rounded-lg">
              <p className="font-medium">You:</p>
              <p>{message.query}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <p className="font-medium">Assistant:</p>
              <p>{message.response}</p>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={message.feedback === rating ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFeedback(index, rating)}
                >
                  {rating}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me anything about teaching..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="w-4 h-4 mr-2" />
          {isLoading ? "Thinking..." : "Send"}
        </Button>
      </form>
    </Card>
  )
}
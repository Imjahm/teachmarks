import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { MessageCircle, Send, Loader2 } from "lucide-react"
import { useLocation } from "react-router-dom"

interface Message {
  query: string
  response: string
  feedback?: number
  context?: {
    section?: string
    subject?: string
    gradeLevel?: number
  }
}

interface TeacherBotProps {
  subject?: string
  gradeLevel?: number
}

export const TeacherBot = ({ subject, gradeLevel }: TeacherBotProps) => {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const location = useLocation()

  // Get current section from the URL path
  const getCurrentSection = () => {
    const path = location.pathname.split("/")[1] || "dashboard"
    return path.charAt(0).toUpperCase() + path.slice(1)
  }

  // Generate context-aware placeholder based on current section
  const getPlaceholder = () => {
    const section = getCurrentSection()
    switch (section.toLowerCase()) {
      case "dashboard":
        return "Ask me about your dashboard metrics or recent activities..."
      case "upload":
        return "Need help uploading and organizing work?"
      case "students":
        return "Ask about student management and progress tracking..."
      case "marking":
        return "Need assistance with marking or feedback?"
      case "rubrics":
        return "Help with creating or applying rubrics..."
      case "lesson-plans":
        return "Ask me to help create or modify lesson plans..."
      case "personas":
        return "Questions about user roles and permissions?"
      case "resources":
        return "Need help finding or organizing resources?"
      default:
        return "Ask me anything about teaching..."
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('ai-teacher-bot', {
        body: { 
          query,
          context: {
            section: getCurrentSection(),
            subject,
            gradeLevel,
            previousInteractions: messages
          }
        }
      })

      if (error) throw error

      const newMessage = { 
        query, 
        response: data.response,
        context: {
          section: getCurrentSection(),
          subject,
          gradeLevel
        }
      }

      setMessages(prev => [...prev, newMessage])
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
          placeholder={getPlaceholder()}
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
    </Card>
  )
}
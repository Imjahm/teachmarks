import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { MessageCircle } from "lucide-react"
import { useLocation } from "react-router-dom"
import { MessageList } from "./MessageList"
import { MessageInput } from "./MessageInput"
import { Message } from "./types"
import { getCurrentSection, getInitialPrompt, getPlaceholder } from "./TeacherBotContext"

interface TeacherBotProps {
  subject?: string
  gradeLevel?: number
}

export const TeacherBot = ({ subject, gradeLevel }: TeacherBotProps) => {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const location = useLocation()

  // Add initial prompt when section changes
  useEffect(() => {
    const initialPrompt = getInitialPrompt()
    setMessages(prev => {
      if (prev.length === 0 || prev[prev.length - 1].context?.section !== getCurrentSection()) {
        return [...prev, {
          query: "What can you help me with?",
          response: initialPrompt,
          context: {
            section: getCurrentSection(),
            subject,
            gradeLevel
          }
        }]
      }
      return prev
    })
  }, [location.pathname, subject, gradeLevel])

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
    <Card className="p-6 space-y-4 h-[calc(100vh-12rem)]">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5" />
        <h2 className="text-lg font-semibold">AI Teaching Assistant</h2>
      </div>

      <MessageList messages={messages} onFeedback={handleFeedback} />

      <MessageInput
        query={query}
        isLoading={isLoading}
        placeholder={getPlaceholder()}
        onQueryChange={setQuery}
        onSubmit={handleSubmit}
      />
    </Card>
  )
}
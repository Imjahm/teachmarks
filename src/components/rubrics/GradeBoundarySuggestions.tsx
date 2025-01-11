import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { Loader2 } from "lucide-react"
import { GradeBoundariesList } from "./GradeBoundaries"

interface GradeBoundarySuggestionsProps {
  examBoard: string
  subject: string
  onAcceptSuggestions: (boundaries: Record<string, number>) => void
}

export function GradeBoundarySuggestions({ 
  examBoard, 
  subject,
  onAcceptSuggestions 
}: GradeBoundarySuggestionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<Record<string, number> | null>(null)

  const handleGetSuggestions = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('suggest-grade-boundaries', {
        body: { examBoard, subject }
      })

      if (error) throw error
      setSuggestions(data.suggestions)
    } catch (error) {
      console.error('Error getting grade boundary suggestions:', error)
      toast.error('Failed to get suggestions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleGetSuggestions}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Getting Suggestions...
          </>
        ) : (
          'Get AI Suggestions'
        )}
      </Button>

      {suggestions && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Suggested Grade Boundaries</h3>
          <GradeBoundariesList boundaries={suggestions} />
          <Button onClick={() => onAcceptSuggestions(suggestions)}>
            Accept Suggestions
          </Button>
        </div>
      )}
    </div>
  )
}
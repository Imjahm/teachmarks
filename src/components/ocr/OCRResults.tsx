import { useEffect, useState } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { Card } from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client"

interface OCRResult {
  id: string
  file_name: string
  extracted_text: string
  created_at: string
}

interface OCRResultsProps {
  routePath: string
}

export const OCRResults = ({ routePath }: OCRResultsProps) => {
  const [results, setResults] = useState<OCRResult[]>([])
  const session = useSession()

  useEffect(() => {
    if (session?.user) {
      const fetchResults = async () => {
        const { data, error } = await supabase
          .from('ocr_results')
          .select('*')
          .eq('teacher_id', session.user.id)
          .eq('route_path', routePath)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching OCR results:', error)
          return
        }

        setResults(data || [])
      }

      fetchResults()

      // Subscribe to changes
      const channel = supabase
        .channel('ocr_results_changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'ocr_results',
            filter: `teacher_id=eq.${session.user.id}`,
          },
          () => {
            fetchResults()
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [session?.user, routePath])

  if (results.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recent OCR Results</h2>
      {results.map((result) => (
        <Card key={result.id} className="p-4">
          <h3 className="font-medium mb-2">{result.file_name}</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {result.extracted_text}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {new Date(result.created_at).toLocaleString()}
          </p>
        </Card>
      ))}
    </div>
  )
}
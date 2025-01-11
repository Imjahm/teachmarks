import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Upload } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

interface GradeBoundariesUploadProps {
  onProcessed: (data: { gradeBoundaries: Record<string, number>, criteria: Array<{ name: string, marks: number }> }) => void
}

export function GradeBoundariesUpload({ onProcessed }: GradeBoundariesUploadProps) {
  const [content, setContent] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      setContent(text)
    } catch (error) {
      console.error('Error reading file:', error)
      toast.error("Failed to read file")
    }
  }

  const handleProcess = async () => {
    if (!content) {
      toast.error("Please upload a file or paste content first")
      return
    }

    setIsProcessing(true)
    try {
      const { data, error } = await supabase.functions.invoke('process-grade-boundaries', {
        body: { content }
      })

      if (error) throw error

      const processedData = JSON.parse(data.processedContent)
      onProcessed(processedData)
      toast.success("Content processed successfully")
    } catch (error) {
      console.error('Error processing content:', error)
      toast.error("Failed to process content")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Upload Grade Boundaries & Criteria</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upload a file or paste text containing grade boundaries and marking criteria
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="file"
            accept=".txt,.doc,.docx,.pdf"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="outline" className="w-full" asChild>
              <div>
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </div>
            </Button>
          </label>
        </div>

        <div>
          <Textarea
            placeholder="Or paste your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
          />
        </div>

        <Button 
          onClick={handleProcess}
          disabled={!content || isProcessing}
          className="w-full"
        >
          {isProcessing ? "Processing..." : "Process Content"}
        </Button>
      </div>
    </Card>
  )
}
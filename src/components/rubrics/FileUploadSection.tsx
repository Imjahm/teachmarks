import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

interface FileUploadSectionProps {
  onProcessed: (data: { grade_boundaries: string, criteria: string }) => void
}

export const FileUploadSection = ({ onProcessed }: FileUploadSectionProps) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    try {
      const text = await file.text()
      const { data, error } = await supabase.functions.invoke('process-rubric', {
        body: { content: text }
      })

      if (error) throw error

      if (data.grade_boundaries) {
        onProcessed({
          grade_boundaries: JSON.stringify(data.grade_boundaries, null, 2),
          criteria: JSON.stringify(data.criteria, null, 2)
        })
      }

      toast.success("Content processed successfully")
    } catch (error) {
      console.error('Error processing content:', error)
      toast.error("Failed to process content")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Upload Document</h3>
      <div className="space-y-4">
        <Input
          type="file"
          accept=".txt,.doc,.docx,.pdf"
          onChange={handleFileUpload}
          disabled={isProcessing}
        />
        <p className="text-sm text-muted-foreground">
          Upload a document containing grade boundaries and criteria, or manually enter them below
        </p>
      </div>
    </Card>
  )
}
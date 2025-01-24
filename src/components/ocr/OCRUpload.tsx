import { useState } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Upload, Loader2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

export const OCRUpload = ({ routePath }: { routePath: string }) => {
  const [isUploading, setIsUploading] = useState(false)
  const session = useSession()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !session?.user) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('routePath', routePath)

      const { data, error } = await supabase.functions.invoke('process-ocr', {
        body: formData,
      })

      if (error) throw error

      toast.success('Text extracted successfully')
    } catch (error: any) {
      console.error('Error uploading file:', error)
      toast.error(error.message || 'Failed to process image')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Image for OCR</h2>
      <div className="space-y-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        <Button disabled={isUploading} className="w-full">
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </>
          )}
        </Button>
      </div>
    </Card>
  )
}
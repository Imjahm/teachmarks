import { useState, useRef } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Upload, Loader2 } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"

interface OCRUploadProps {
  routePath: string
}

export const OCRUpload = ({ routePath }: OCRUploadProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const session = useSession()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !session?.user) {
      toast.error('Please select a file first')
      return
    }

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('routePath', routePath)

      const { data, error } = await supabase.functions.invoke('process-ocr', {
        body: formData,
      })

      if (error) throw error

      toast.success('Text extracted successfully')
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
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
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading}
        />
        <Button 
          onClick={handleUpload} 
          disabled={isUploading || !selectedFile}
          className="w-full"
        >
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
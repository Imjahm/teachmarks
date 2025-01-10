import { useState } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Upload } from "lucide-react"

export const ResourceUpload = () => {
  const session = useSession()
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !session?.user) return

    setIsUploading(true)
    try {
      // Upload file to storage
      const fileExt = file.name.split('.').pop()
      const filePath = `${crypto.randomUUID()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Get AI categorization
      const response = await supabase.functions.invoke('process-resource', {
        body: { 
          fileName: file.name,
          fileType: file.type,
          resourceType: 'teaching'
        }
      })

      if (response.error) throw response.error

      // Save metadata to database
      const { error: dbError } = await supabase
        .from('resources')
        .insert({
          teacher_id: session.user.id,
          file_name: file.name,
          file_path: filePath,
          content_type: file.type,
          size: file.size,
          ai_categorization: response.data.analysis
        })

      if (dbError) throw dbError

      toast({
        title: "Success",
        description: "Resource uploaded and categorized successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Teaching Resource</h2>
      <div className="space-y-4">
        <Input
          type="file"
          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        <Button disabled={isUploading}>
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? "Uploading..." : "Upload Resource"}
        </Button>
      </div>
    </Card>
  )
}
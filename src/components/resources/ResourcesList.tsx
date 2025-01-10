import { useEffect, useState } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { Card } from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client"
import { FileText, Download } from "lucide-react"

export const ResourcesList = () => {
  const session = useSession()
  const [resources, setResources] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user) {
      loadResources()
    }
  }, [session])

  const loadResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setResources(data || [])
    } catch (error: any) {
      console.error('Error loading resources:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const downloadResource = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('resources')
        .download(filePath)

      if (error) throw error

      const url = URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      a.click()
      URL.revokeObjectURL(url)
    } catch (error: any) {
      console.error('Error downloading resource:', error.message)
    }
  }

  if (loading) {
    return <div>Loading resources...</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <Card key={resource.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-medium">{resource.file_name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(resource.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => downloadResource(resource.file_path, resource.file_name)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
          {resource.ai_categorization && (
            <div className="mt-3 text-sm">
              <p><strong>Subject:</strong> {resource.ai_categorization.subject}</p>
              <p><strong>Topic:</strong> {resource.ai_categorization.topic}</p>
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
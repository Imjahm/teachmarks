import { useQuery } from "@tanstack/react-query"
import { useSession } from "@supabase/auth-helpers-react"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Eye } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export const RubricsList = () => {
  const session = useSession()
  const navigate = useNavigate()

  const { data: rubrics, isLoading, refetch } = useQuery({
    queryKey: ["rubrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rubrics")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      return data
    },
  })

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("rubrics")
        .delete()
        .eq("id", id)

      if (error) throw error

      toast.success("Rubric deleted successfully")
      refetch()
    } catch (error: any) {
      toast.error(error.message || "Failed to delete rubric")
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {rubrics?.map((rubric) => (
        <Card key={rubric.id} className="flex flex-col">
          <CardHeader>
            <CardTitle>{rubric.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Exam Board: {rubric.exam_board}</p>
            <p className="text-sm text-gray-500">Total Marks: {rubric.total_marks}</p>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 mt-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/rubrics/${rubric.id}`)}
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(rubric.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
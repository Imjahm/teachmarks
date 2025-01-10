import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileText, Download } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import type { Database } from "@/types/database.types"
import Papa from 'papaparse'
import { useToast } from "@/components/ui/use-toast"

type Rubric = Database["public"]["Tables"]["rubrics"]["Row"]

export const RubricsList = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const { data: rubrics, isLoading } = useQuery({
    queryKey: ["rubrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rubrics")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      return data as Rubric[]
    },
  })

  const handleExportCSV = () => {
    if (!rubrics || rubrics.length === 0) {
      toast({
        title: "No data to export",
        description: "Create some rubrics first before exporting.",
        variant: "destructive",
      })
      return
    }

    // Transform data for CSV export
    const csvData = rubrics.map(rubric => ({
      Title: rubric.title,
      'Exam Board': rubric.exam_board,
      'Total Marks': rubric.total_marks,
      'Created At': new Date(rubric.created_at).toLocaleDateString(),
      'Grade Boundaries': JSON.stringify(rubric.grade_boundaries),
      'Criteria': JSON.stringify(rubric.criteria)
    }))

    // Convert to CSV
    const csv = Papa.unparse(csvData)
    
    // Create and trigger download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `rubrics-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: "Export successful",
      description: "Your rubrics have been exported to CSV.",
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Rubrics</h1>
          <p className="text-muted-foreground">
            Manage your marking rubrics and grade boundaries
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => navigate("/rubrics/upload")}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Rubric
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {rubrics?.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No rubrics yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Create your first rubric to get started with marking
              </p>
              <Button onClick={() => navigate("/rubrics/upload")}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Rubric
              </Button>
            </CardContent>
          </Card>
        ) : (
          rubrics?.map((rubric) => (
            <Card
              key={rubric.id}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => navigate(`/rubrics/${rubric.id}`)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{rubric.title}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {rubric.exam_board}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Total Marks: {rubric.total_marks}</span>
                  <span>
                    Created:{" "}
                    {new Date(rubric.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
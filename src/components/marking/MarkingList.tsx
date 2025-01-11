import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { format } from "date-fns"

interface Marking {
  id: string
  created_at: string
  student_name: string
  marks: number
  feedback: string
  grade: string
  criteria_marks: Record<string, number>
}

export function MarkingList({ rubricId }: { rubricId: string }) {
  const { data: markings, isLoading } = useQuery({
    queryKey: ["markings", rubricId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("marking")
        .select("*")
        .eq("rubric_id", rubricId)
        .order("created_at", { ascending: false })

      if (error) throw error
      return data as Marking[]
    },
  })

  if (isLoading) {
    return <div>Loading markings...</div>
  }

  if (!markings?.length) {
    return <div className="text-muted-foreground">No markings yet</div>
  }

  return (
    <div className="space-y-4">
      {markings.map((marking) => (
        <div key={marking.id} className="border rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{marking.student_name}</h3>
              <p className="text-sm text-muted-foreground">
                Marked on {format(new Date(marking.created_at), "PPP")}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{marking.grade}</div>
              <div className="text-sm text-muted-foreground">
                {marking.marks} marks
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Criteria Marks</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(marking.criteria_marks).map(([criterion, marks]) => (
                <div key={criterion} className="text-sm">
                  <span className="font-medium">{criterion}:</span> {marks} marks
                </div>
              ))}
            </div>
          </div>

          {marking.feedback && (
            <div>
              <h4 className="font-medium">Feedback</h4>
              <p className="text-sm">{marking.feedback}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
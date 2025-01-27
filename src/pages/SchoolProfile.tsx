import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { SchoolInfo } from "@/components/school/SchoolInfo"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import type { Database } from "@/integrations/supabase/types"

type School = Database["public"]["Tables"]["schools"]["Row"]

const SchoolProfile = () => {
  const { schoolId } = useParams()

  const { data: school, isLoading, error } = useQuery({
    queryKey: ["school", schoolId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("schools")
        .select("*")
        .eq("id", schoolId)
        .maybeSingle()

      if (error) throw error
      return data as School
    },
  })

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading school data: {error.message}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!school) {
    return (
      <div className="p-8">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>School not found</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="p-8">
      <SchoolInfo {...school} />
    </div>
  )
}

export default SchoolProfile
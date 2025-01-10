import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { ResourceSearch } from "@/components/resources/ResourceSearch"
import { ResourcesList } from "@/components/resources/ResourcesList"
import { ResourceUpload } from "@/components/resources/ResourceUpload"
import { supabase } from "@/integrations/supabase/client"

const Resources = () => {
  const [searchParams, setSearchParams] = useState<{
    query: string;
    filters: { subject?: string; grade?: number; type?: string };
  }>({
    query: "",
    filters: {}
  })

  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources', searchParams],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('search_resources', {
        search_query: searchParams.query || null,
        subject_filter: searchParams.filters.subject || null,
        grade_filter: searchParams.filters.grade || null,
        type_filter: searchParams.filters.type || null
      })

      if (error) throw error
      return data
    },
  })

  const handleSearch = (query: string, filters: { subject?: string; grade?: number; type?: string }) => {
    setSearchParams({ query, filters })
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Educational Resources</h1>
      </div>

      <ResourceUpload />
      
      <div className="space-y-6">
        <ResourceSearch onSearch={handleSearch} />
        {isLoading ? (
          <div>Loading resources...</div>
        ) : (
          <ResourcesList resources={resources || []} />
        )}
      </div>
    </div>
  )
}

export default Resources
import { useState } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { SchoolMap } from "./SchoolMap"

export const SchoolForm = () => {
  const session = useSession()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    latitude: 0,
    longitude: 0
  })

  const createSchool = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('schools')
        .insert([
          {
            ...data,
            teacher_id: session?.user?.id,
          }
        ])
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] })
      toast({
        title: "Success",
        description: "School added successfully",
      })
      setFormData({
        name: "",
        address: "",
        latitude: 0,
        longitude: 0
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add school",
        variant: "destructive",
      })
      console.error("Error adding school:", error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createSchool.mutate(formData)
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Add New School</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">School Name</label>
          <Input
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <Input
            required
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          />
        </div>

        <SchoolMap 
          onLocationSelect={(lat, lng) => 
            setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }))
          }
        />

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={createSchool.isPending || !formData.latitude || !formData.longitude}
          >
            {createSchool.isPending ? "Adding..." : "Add School"}
          </Button>
        </div>
      </form>
    </Card>
  )
}
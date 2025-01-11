import { useState } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { X } from "lucide-react"

interface StudentFormProps {
  onClose: () => void
  selectedSchoolId: string
}

export const StudentForm = ({ onClose, selectedSchoolId }: StudentFormProps) => {
  const session = useSession()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    class: "",
  })

  const createStudent = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (!session?.user?.id) {
        throw new Error("User not authenticated")
      }

      const { error } = await supabase
        .from('students')
        .insert([
          {
            ...data,
            age: parseInt(data.age),
            school_id: selectedSchoolId,
            teacher_id: session.user.id,
          }
        ])
      
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast({
        title: "Success",
        description: "Student added successfully",
      })
      onClose()
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add student",
        variant: "destructive",
      })
      console.error("Error adding student:", error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createStudent.mutate(formData)
  }

  return (
    <Card className="p-6 relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <Input
            required
            type="number"
            value={formData.age}
            onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Class</label>
          <Input
            required
            value={formData.class}
            onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={createStudent.isPending}>
            {createStudent.isPending ? "Adding..." : "Add Student"}
          </Button>
        </div>
      </form>
    </Card>
  )
}
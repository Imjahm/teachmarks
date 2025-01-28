import { useState } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { BasicInfoSection } from "./form-sections/BasicInfoSection"
import { ContactSection } from "./form-sections/ContactSection"

export const SchoolForm = () => {
  const session = useSession()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
    phone_number: "",
    email: "",
    website: "",
    school_type: "",
    district: "",
    grade_levels: "",
    total_students: 0,
    student_teacher_ratio: 0,
    curriculum: "",
    average_performance: 0,
    graduation_rate: 0,
    attendance_rate: 0,
    principal_name: "",
    total_teachers: 0,
    classrooms: 0,
    labs: 0,
    has_library: false,
    has_sports_facilities: false,
    annual_budget: 0,
    funding_sources: "",
    achievements: "",
    partnerships: "",
    established_date: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
    affiliation: "",
    description: ""
  })

  const createSchool = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (!session?.user?.id) {
        throw new Error("User not authenticated")
      }

      const { error } = await supabase
        .from('schools')
        .insert([
          {
            ...data,
            teacher_id: session.user.id,
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
        longitude: 0,
        phone_number: "",
        email: "",
        website: "",
        school_type: "",
        district: "",
        grade_levels: "",
        total_students: 0,
        student_teacher_ratio: 0,
        curriculum: "",
        average_performance: 0,
        graduation_rate: 0,
        attendance_rate: 0,
        principal_name: "",
        total_teachers: 0,
        classrooms: 0,
        labs: 0,
        has_library: false,
        has_sports_facilities: false,
        annual_budget: 0,
        funding_sources: "",
        achievements: "",
        partnerships: "",
        established_date: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        affiliation: "",
        description: ""
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
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <BasicInfoSection formData={formData} setFormData={setFormData} />
        <ContactSection formData={formData} setFormData={setFormData} />
        
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
import { useState } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { SchoolMap } from "./SchoolMap"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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
        partnerships: ""
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
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>School Name</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of the school"
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                required
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
            <div>
              <Label>City</Label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>
            <div>
              <Label>State</Label>
              <Input
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
              />
            </div>
            <div>
              <Label>ZIP Code</Label>
              <Input
                value={formData.zip_code}
                onChange={(e) => setFormData(prev => ({ ...prev, zip_code: e.target.value }))}
              />
            </div>
            <div>
              <Label>Country</Label>
              <Input
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
              />
            </div>
            <div>
              <Label>Established Date</Label>
              <Input
                type="date"
                value={formData.established_date}
                onChange={(e) => setFormData(prev => ({ ...prev, established_date: e.target.value }))}
              />
            </div>
            <div>
              <Label>Affiliation</Label>
              <Input
                value={formData.affiliation}
                onChange={(e) => setFormData(prev => ({ ...prev, affiliation: e.target.value }))}
                placeholder="e.g., CBSE, ICSE, IB"
              />
            </div>
          </div>

          <SchoolMap 
            onLocationSelect={(lat, lng) => 
              setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }))
            }
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                value={formData.phone_number}
                onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              />
            </div>
          </div>
        </div>

        {/* School Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">School Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>School Type</Label>
              <Select 
                value={formData.school_type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, school_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select school type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="charter">Charter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>District</Label>
              <Input
                value={formData.district}
                onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
              />
            </div>
            <div>
              <Label>Grade Levels</Label>
              <Input
                value={formData.grade_levels}
                onChange={(e) => setFormData(prev => ({ ...prev, grade_levels: e.target.value }))}
                placeholder="e.g., K-12"
              />
            </div>
            <div>
              <Label>Curriculum</Label>
              <Input
                value={formData.curriculum}
                onChange={(e) => setFormData(prev => ({ ...prev, curriculum: e.target.value }))}
                placeholder="e.g., IB, Cambridge"
              />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">School Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Total Students</Label>
              <Input
                type="number"
                value={formData.total_students}
                onChange={(e) => setFormData(prev => ({ ...prev, total_students: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label>Total Teachers</Label>
              <Input
                type="number"
                value={formData.total_teachers}
                onChange={(e) => setFormData(prev => ({ ...prev, total_teachers: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label>Student-Teacher Ratio</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.student_teacher_ratio}
                onChange={(e) => setFormData(prev => ({ ...prev, student_teacher_ratio: parseFloat(e.target.value) || 0 }))}
              />
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Average Performance (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.average_performance}
                onChange={(e) => setFormData(prev => ({ ...prev, average_performance: parseFloat(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label>Graduation Rate (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.graduation_rate}
                onChange={(e) => setFormData(prev => ({ ...prev, graduation_rate: parseFloat(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label>Attendance Rate (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.attendance_rate}
                onChange={(e) => setFormData(prev => ({ ...prev, attendance_rate: parseFloat(e.target.value) || 0 }))}
              />
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Facilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Number of Classrooms</Label>
              <Input
                type="number"
                value={formData.classrooms}
                onChange={(e) => setFormData(prev => ({ ...prev, classrooms: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label>Number of Labs</Label>
              <Input
                type="number"
                value={formData.labs}
                onChange={(e) => setFormData(prev => ({ ...prev, labs: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>
          <div className="flex space-x-8">
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.has_library}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_library: checked }))}
              />
              <Label>Has Library</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.has_sports_facilities}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_sports_facilities: checked }))}
              />
              <Label>Has Sports Facilities</Label>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Additional Information</h3>
          <div className="space-y-4">
            <div>
              <Label>Principal Name</Label>
              <Input
                value={formData.principal_name}
                onChange={(e) => setFormData(prev => ({ ...prev, principal_name: e.target.value }))}
              />
            </div>
            <div>
              <Label>Annual Budget</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.annual_budget}
                onChange={(e) => setFormData(prev => ({ ...prev, annual_budget: parseFloat(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label>Funding Sources</Label>
              <Textarea
                value={formData.funding_sources}
                onChange={(e) => setFormData(prev => ({ ...prev, funding_sources: e.target.value }))}
                placeholder="List the sources of funding"
              />
            </div>
            <div>
              <Label>Achievements</Label>
              <Textarea
                value={formData.achievements}
                onChange={(e) => setFormData(prev => ({ ...prev, achievements: e.target.value }))}
                placeholder="List notable achievements"
              />
            </div>
            <div>
              <Label>Partnerships</Label>
              <Textarea
                value={formData.partnerships}
                onChange={(e) => setFormData(prev => ({ ...prev, partnerships: e.target.value }))}
                placeholder="List partnerships with other institutions"
              />
            </div>
          </div>
        </div>

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

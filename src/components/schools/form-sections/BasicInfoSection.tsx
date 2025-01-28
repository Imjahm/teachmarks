import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SchoolMap } from "../SchoolMap"

interface BasicInfoSectionProps {
  formData: {
    name: string
    description: string
    address: string
    city: string
    state: string
    zip_code: string
    country: string
    established_date: string
    affiliation: string
  }
  setFormData: (data: any) => void
}

export const BasicInfoSection = ({ formData, setFormData }: BasicInfoSectionProps) => {
  return (
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
  )
}
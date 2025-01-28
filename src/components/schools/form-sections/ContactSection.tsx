import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ContactSectionProps {
  formData: {
    phone_number: string
    email: string
    website: string
  }
  setFormData: (data: any) => void
}

export const ContactSection = ({ formData, setFormData }: ContactSectionProps) => {
  return (
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
  )
}
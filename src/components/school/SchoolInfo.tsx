import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BasicInfoSection } from "./info-sections/BasicInfoSection"
import { ContactSection } from "./info-sections/ContactSection"
import { SchoolDetailsSection } from "./info-sections/SchoolDetailsSection"
import { StatisticsSection } from "./info-sections/StatisticsSection"
import { PerformanceSection } from "./info-sections/PerformanceSection"
import { FacilitiesSection } from "./info-sections/FacilitiesSection"
import { AdditionalInfoSection } from "./info-sections/AdditionalInfoSection"

interface SchoolInfoProps {
  name: string
  address: string
  latitude: number
  longitude: number
  phone_number?: string
  email?: string
  website?: string
  school_type?: string
  district?: string
  grade_levels?: string
  total_students?: number
  student_teacher_ratio?: number
  curriculum?: string
  average_performance?: number
  graduation_rate?: number
  attendance_rate?: number
  principal_name?: string
  total_teachers?: number
  classrooms?: number
  labs?: number
  has_library?: boolean
  has_sports_facilities?: boolean
  annual_budget?: number
  funding_sources?: string
  achievements?: string
  partnerships?: string
  established_date?: string
  city?: string
  state?: string
  zip_code?: string
  country?: string
  affiliation?: string
  description?: string
}

export const SchoolInfo = ({ 
  name,
  description,
  ...props
}: SchoolInfoProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <BasicInfoSection {...props} />
        <ContactSection {...props} />
        <SchoolDetailsSection {...props} />
        <StatisticsSection {...props} />
        <PerformanceSection {...props} />
        <Separator />
        <FacilitiesSection {...props} />
        <AdditionalInfoSection {...props} />
      </CardContent>
    </Card>
  )
}
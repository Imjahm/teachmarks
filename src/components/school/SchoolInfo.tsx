import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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
}

export const SchoolInfo = ({ 
  name,
  address,
  latitude,
  longitude,
  phone_number,
  email,
  website,
  school_type,
  district,
  grade_levels,
  total_students,
  student_teacher_ratio,
  curriculum,
  average_performance,
  graduation_rate,
  attendance_rate,
  principal_name,
  total_teachers,
  classrooms,
  labs,
  has_library,
  has_sports_facilities,
  annual_budget,
  funding_sources,
  achievements,
  partnerships
}: SchoolInfoProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Address:</p>
              <p className="text-muted-foreground">{address}</p>
            </div>
            <div>
              <p className="font-medium">Location:</p>
              <p className="text-muted-foreground">Lat: {latitude}, Long: {longitude}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {phone_number && (
              <div>
                <p className="font-medium">Phone:</p>
                <p className="text-muted-foreground">{phone_number}</p>
              </div>
            )}
            {email && (
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-muted-foreground">{email}</p>
              </div>
            )}
            {website && (
              <div>
                <p className="font-medium">Website:</p>
                <a href={website} target="_blank" rel="noopener noreferrer" 
                   className="text-primary hover:underline">
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* School Details */}
        <div>
          <h3 className="text-lg font-semibold mb-2">School Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {school_type && (
              <div>
                <p className="font-medium">Type:</p>
                <p className="text-muted-foreground">{school_type}</p>
              </div>
            )}
            {district && (
              <div>
                <p className="font-medium">District:</p>
                <p className="text-muted-foreground">{district}</p>
              </div>
            )}
            {grade_levels && (
              <div>
                <p className="font-medium">Grade Levels:</p>
                <p className="text-muted-foreground">{grade_levels}</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Statistics */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {total_students !== undefined && (
              <div>
                <p className="font-medium">Total Students:</p>
                <p className="text-muted-foreground">{total_students}</p>
              </div>
            )}
            {student_teacher_ratio !== undefined && (
              <div>
                <p className="font-medium">Student-Teacher Ratio:</p>
                <p className="text-muted-foreground">{student_teacher_ratio}:1</p>
              </div>
            )}
            {total_teachers !== undefined && (
              <div>
                <p className="font-medium">Total Teachers:</p>
                <p className="text-muted-foreground">{total_teachers}</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Performance Metrics */}
        {(average_performance !== undefined || graduation_rate !== undefined || attendance_rate !== undefined) && (
          <>
            <div>
              <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {average_performance !== undefined && (
                  <div>
                    <p className="font-medium">Average Performance:</p>
                    <p className="text-muted-foreground">{average_performance}%</p>
                  </div>
                )}
                {graduation_rate !== undefined && (
                  <div>
                    <p className="font-medium">Graduation Rate:</p>
                    <p className="text-muted-foreground">{graduation_rate}%</p>
                  </div>
                )}
                {attendance_rate !== undefined && (
                  <div>
                    <p className="font-medium">Attendance Rate:</p>
                    <p className="text-muted-foreground">{attendance_rate}%</p>
                  </div>
                )}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Facilities */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Facilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {classrooms !== undefined && (
              <div>
                <p className="font-medium">Classrooms:</p>
                <p className="text-muted-foreground">{classrooms}</p>
              </div>
            )}
            {labs !== undefined && (
              <div>
                <p className="font-medium">Labs:</p>
                <p className="text-muted-foreground">{labs}</p>
              </div>
            )}
            <div>
              <p className="font-medium">Facilities:</p>
              <p className="text-muted-foreground">
                {[
                  has_library && 'Library',
                  has_sports_facilities && 'Sports Facilities'
                ].filter(Boolean).join(', ') || 'None reported'}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {(achievements || partnerships || funding_sources || annual_budget !== undefined) && (
          <>
            <Separator />
            <div>
              <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
              <div className="space-y-4">
                {achievements && (
                  <div>
                    <p className="font-medium">Achievements:</p>
                    <p className="text-muted-foreground">{achievements}</p>
                  </div>
                )}
                {partnerships && (
                  <div>
                    <p className="font-medium">Partnerships:</p>
                    <p className="text-muted-foreground">{partnerships}</p>
                  </div>
                )}
                {funding_sources && (
                  <div>
                    <p className="font-medium">Funding Sources:</p>
                    <p className="text-muted-foreground">{funding_sources}</p>
                  </div>
                )}
                {annual_budget !== undefined && (
                  <div>
                    <p className="font-medium">Annual Budget:</p>
                    <p className="text-muted-foreground">
                      ${annual_budget.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
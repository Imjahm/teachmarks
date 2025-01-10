import { useSession } from "@supabase/auth-helpers-react"
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader"
import { useLocation } from "react-router-dom"
import { UploadDashboard } from "@/components/dashboard/UploadDashboard"
import { StudentsDashboard } from "@/components/dashboard/StudentsDashboard"
import { MarkingDashboard } from "@/components/dashboard/MarkingDashboard"
import { RubricsDashboard } from "@/components/dashboard/RubricsDashboard"
import { LessonPlansDashboard } from "@/components/dashboard/LessonPlansDashboard"

const Index = () => {
  const session = useSession()
  const location = useLocation()

  const renderDashboard = () => {
    const path = location.pathname
    
    if (path.startsWith("/upload")) return <UploadDashboard />
    if (path.startsWith("/students")) return <StudentsDashboard />
    if (path.startsWith("/marking")) return <MarkingDashboard />
    if (path.startsWith("/rubrics")) return <RubricsDashboard />
    if (path.startsWith("/lesson-plans")) return <LessonPlansDashboard />
    
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-700">
          Welcome to your dashboard
        </h2>
        <p className="text-gray-500 mt-2">
          Select a section from the sidebar to get started
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <WelcomeHeader email={session?.user?.email} />
      {renderDashboard()}
    </div>
  )
}

export default Index
import { useSession } from "@supabase/auth-helpers-react"
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader"
import { useLocation } from "react-router-dom"
import { Suspense, lazy } from "react"
import { Loader2 } from "lucide-react"

// Lazy load dashboard components
const UploadDashboard = lazy(() => import("@/components/dashboard/UploadDashboard"))
const StudentsDashboard = lazy(() => import("@/components/dashboard/StudentsDashboard"))
const MarkingDashboard = lazy(() => import("@/components/dashboard/MarkingDashboard"))
const RubricsDashboard = lazy(() => import("@/components/dashboard/RubricsDashboard"))
const LessonPlansDashboard = lazy(() => import("@/components/dashboard/LessonPlansDashboard"))

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
)

const Index = () => {
  const session = useSession()
  const location = useLocation()

  const renderDashboard = () => {
    const path = location.pathname
    
    return (
      <Suspense fallback={<LoadingSpinner />}>
        {path.startsWith("/upload") && <UploadDashboard />}
        {path.startsWith("/students") && <StudentsDashboard />}
        {path.startsWith("/marking") && <MarkingDashboard />}
        {path.startsWith("/rubrics") && <RubricsDashboard />}
        {path.startsWith("/lesson-plans") && <LessonPlansDashboard />}
        {path === "/" && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700">
              Welcome to your dashboard
            </h2>
            <p className="text-gray-500 mt-2">
              Select a section from the sidebar to get started
            </p>
          </div>
        )}
      </Suspense>
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
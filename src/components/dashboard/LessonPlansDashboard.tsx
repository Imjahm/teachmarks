import { StatsCard } from "./StatsCard"
import { DashboardCard } from "./DashboardCard"
import { GraduationCap, Plus, BookOpen } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const LessonPlansDashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={GraduationCap}
          title="Generate Plan"
          description="Create a new lesson plan"
          onClick={() => navigate("/lesson-plans")}
        />
        <DashboardCard
          icon={Plus}
          title="Custom Plan"
          description="Create a custom lesson plan"
          onClick={() => navigate("/lesson-plans/custom")}
        />
        <DashboardCard
          icon={BookOpen}
          title="Templates"
          description="Use lesson plan templates"
          onClick={() => navigate("/lesson-plans/templates")}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <StatsCard
          title="Lesson Plan Statistics"
          emptyMessage="No lesson plan statistics available"
        />
        <StatsCard
          title="Recent Activity"
          emptyMessage="No recent lesson plan activity"
        />
      </div>
    </div>
  )
}
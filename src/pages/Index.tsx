import { useSession } from "@supabase/auth-helpers-react"
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader"
import { DashboardCard } from "@/components/dashboard/DashboardCard"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { TeacherBot } from "@/components/ai/TeacherBot"
import { BookOpen, FileText, GraduationCap } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Index = () => {
  const session = useSession()
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <WelcomeHeader email={session?.user?.email} />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={BookOpen}
          title="Rubrics"
          description="Create and manage marking rubrics"
          onClick={() => navigate("/rubrics")}
        />
        <DashboardCard
          icon={FileText}
          title="Lesson Plans"
          description="Generate and organize lesson plans"
          onClick={() => navigate("/lesson-plans")}
        />
        <DashboardCard
          icon={GraduationCap}
          title="Curriculum Standards"
          description="Manage learning outcomes"
          onClick={() => navigate("/curriculum")}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <TeacherBot />
        <div className="space-y-6">
          <StatsCard
            title="Recent Activity"
            emptyMessage="No recent activity to show"
          />
          <StatsCard
            title="Upcoming Tasks"
            emptyMessage="No upcoming tasks"
          />
        </div>
      </div>
    </div>
  )
}

export default Index
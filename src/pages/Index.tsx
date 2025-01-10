import { useSession } from "@supabase/auth-helpers-react"
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader"
import { DashboardCard } from "@/components/dashboard/DashboardCard"
import { TaskCalendar } from "@/components/dashboard/TaskCalendar"
import { TeacherBot } from "@/components/ai/TeacherBot"
import { BookOpen, FileText, GraduationCap } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Index = () => {
  const session = useSession()
  const navigate = useNavigate()

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <WelcomeHeader email={session?.user?.email} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <TaskCalendar />
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          <TeacherBot />
        </div>
      </div>
    </div>
  )
}

export default Index
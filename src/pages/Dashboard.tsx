import { DashboardCard } from "@/components/dashboard/DashboardCard"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { TaskCalendar } from "@/components/dashboard/TaskCalendar"
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader"
import { useSession } from "@supabase/auth-helpers-react"
import { Upload, BookOpen, CheckSquare, GraduationCap } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const session = useSession()
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <WelcomeHeader email={session?.user?.email} />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          icon={Upload}
          title="Upload Documents"
          description="Upload and process documents with OCR"
          onClick={() => navigate("/upload")}
        />
        <DashboardCard
          icon={BookOpen}
          title="Manage Rubrics"
          description="Create and manage marking rubrics"
          onClick={() => navigate("/rubrics")}
        />
        <DashboardCard
          icon={CheckSquare}
          title="Start Marking"
          description="Begin marking student work"
          onClick={() => navigate("/marking")}
        />
        <DashboardCard
          icon={GraduationCap}
          title="Lesson Plans"
          description="Create and manage lesson plans"
          onClick={() => navigate("/lesson-plans")}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <StatsCard
          title="Recent Activity"
          emptyMessage="No recent activity to display"
        />
        <TaskCalendar />
      </div>
    </div>
  )
}

export default Dashboard
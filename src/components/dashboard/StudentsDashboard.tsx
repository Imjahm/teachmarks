import { StatsCard } from "./StatsCard"
import { DashboardCard } from "./DashboardCard"
import { Users, UserPlus, BookOpen } from "lucide-react"
import { useNavigate } from "react-router-dom"

const StudentsDashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={Users}
          title="Student List"
          description="View and manage your students"
          onClick={() => navigate("/students/list")}
        />
        <DashboardCard
          icon={UserPlus}
          title="Add Student"
          description="Add a new student to your class"
          onClick={() => navigate("/students/new")}
        />
        <DashboardCard
          icon={BookOpen}
          title="Student Progress"
          description="Track student performance"
          onClick={() => navigate("/students/progress")}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <StatsCard
          title="Class Statistics"
          emptyMessage="No class statistics available"
        />
        <StatsCard
          title="Recent Activity"
          emptyMessage="No recent student activity"
        />
      </div>
    </div>
  )
}

export default StudentsDashboard

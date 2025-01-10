import { StatsCard } from "./StatsCard"
import { DashboardCard } from "./DashboardCard"
import { CheckSquare, Clock, History } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const MarkingDashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={CheckSquare}
          title="Pending Marking"
          description="View assignments pending marking"
          onClick={() => navigate("/marking/pending")}
        />
        <DashboardCard
          icon={Clock}
          title="Due Soon"
          description="Assignments due for marking soon"
          onClick={() => navigate("/marking/due")}
        />
        <DashboardCard
          icon={History}
          title="Marking History"
          description="View previously marked work"
          onClick={() => navigate("/marking/history")}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <StatsCard
          title="Marking Statistics"
          emptyMessage="No marking statistics available"
        />
        <StatsCard
          title="Recent Activity"
          emptyMessage="No recent marking activity"
        />
      </div>
    </div>
  )
}
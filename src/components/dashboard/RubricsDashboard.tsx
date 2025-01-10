import { StatsCard } from "./StatsCard"
import { DashboardCard } from "./DashboardCard"
import { BookOpen, Plus, FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"

const RubricsDashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={BookOpen}
          title="View Rubrics"
          description="Browse your marking rubrics"
          onClick={() => navigate("/rubrics")}
        />
        <DashboardCard
          icon={Plus}
          title="Create Rubric"
          description="Create a new marking rubric"
          onClick={() => navigate("/rubrics/upload")}
        />
        <DashboardCard
          icon={FileText}
          title="Templates"
          description="Use predefined rubric templates"
          onClick={() => navigate("/rubrics/templates")}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <StatsCard
          title="Rubric Statistics"
          emptyMessage="No rubric statistics available"
        />
        <StatsCard
          title="Recent Activity"
          emptyMessage="No recent rubric activity"
        />
      </div>
    </div>
  )
}

export default RubricsDashboard

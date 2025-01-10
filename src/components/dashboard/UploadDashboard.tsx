import { StatsCard } from "./StatsCard"
import { DashboardCard } from "./DashboardCard"
import { Upload, FileText, Users } from "lucide-react"
import { useNavigate } from "react-router-dom"

const UploadDashboard = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={Upload}
          title="Upload Work"
          description="Upload student assignments and work"
          onClick={() => navigate("/upload/new")}
        />
        <DashboardCard
          icon={FileText}
          title="Recent Uploads"
          description="View and manage recent uploads"
          onClick={() => navigate("/upload/recent")}
        />
        <DashboardCard
          icon={Users}
          title="Batch Upload"
          description="Upload multiple assignments at once"
          onClick={() => navigate("/upload/batch")}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <StatsCard
          title="Upload Statistics"
          emptyMessage="No upload statistics available"
        />
        <StatsCard
          title="Recent Activity"
          emptyMessage="No recent upload activity"
        />
      </div>
    </div>
  )
}

export default UploadDashboard

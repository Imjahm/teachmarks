import { useSession } from "@supabase/auth-helpers-react"
import { DashboardCard } from "@/components/dashboard/DashboardCard"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { BookOpen, Users, GraduationCap, FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Index = () => {
  const session = useSession()
  const navigate = useNavigate()

  const stats = [
    {
      title: "Close Tasks",
      value: "0",
      label: "Total Tasks",
      items: [
        { label: "0 Open", color: "text-primary" },
        { label: "0 In Progress", color: "text-secondary" },
        { label: "0 Completed", color: "text-muted-foreground" }
      ]
    },
    {
      title: "Plan Resources",
      value: "12",
      label: "Resources",
      items: [
        { label: "0 New", color: "text-primary" },
        { label: "0 Updated", color: "text-secondary" },
        { label: "12 No Activity", color: "text-muted-foreground" }
      ]
    },
    {
      title: "Student Progress",
      value: "20",
      label: "Students",
      items: [
        { label: "5 Excellent", color: "text-primary" },
        { label: "10 Good", color: "text-secondary" },
        { label: "5 Needs Help", color: "text-muted-foreground" }
      ]
    },
    {
      title: "Learning Outcomes",
      value: "22",
      label: "Outcomes",
      items: [
        { label: "8 Achieved", color: "text-primary" },
        { label: "10 In Progress", color: "text-secondary" },
        { label: "4 Not Started", color: "text-muted-foreground" }
      ]
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Welcome back{session?.user?.email ? `, ${session.user.email}` : ''}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            label={stat.label}
            items={stat.items}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          icon={BookOpen}
          title="Rubrics"
          description="Create and manage marking rubrics"
          onClick={() => navigate("/rubrics")}
        />
        <DashboardCard
          icon={Users}
          title="Students"
          description="View and manage student profiles"
          onClick={() => navigate("/students")}
        />
        <DashboardCard
          icon={GraduationCap}
          title="Lesson Plans"
          description="Plan and organize your lessons"
          onClick={() => navigate("/lesson-plans")}
        />
        <DashboardCard
          icon={FileText}
          title="Resources"
          description="Access educational resources"
          onClick={() => navigate("/resources")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title="Today's Tasks"
          emptyMessage="No tasks due today. Plan your day ahead!"
        />
        <StatsCard
          title="Recent Activities"
          emptyMessage="No recent activities to show"
        />
      </div>
    </div>
  )
}

export default Index
import { useSession } from "@supabase/auth-helpers-react";
import { FileText, Upload, Users, BookOpen } from "lucide-react";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StatsCard } from "@/components/dashboard/StatsCard";

const Index = () => {
  const session = useSession();

  return (
    <div className="container mx-auto px-4 py-8">
      <WelcomeHeader email={session?.user?.email} />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <DashboardCard
          icon={Upload}
          title="Upload Work"
          description="Add new student work"
        />
        <DashboardCard
          icon={FileText}
          title="Mark Work"
          description="Grade pending submissions"
        />
        <DashboardCard
          icon={Users}
          title="Classes"
          description="Manage your classes"
        />
        <DashboardCard
          icon={BookOpen}
          title="Rubrics"
          description="Create marking schemes"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <StatsCard
          title="Recent Submissions"
          emptyMessage="No recent submissions"
        />
        <StatsCard
          title="Marking Progress"
          emptyMessage="No work to mark"
        />
      </div>
    </div>
  );
};

export default Index;
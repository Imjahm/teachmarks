import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { FileText, Upload, Users, BookOpen } from "lucide-react";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ResourceUpload } from "@/components/resources/ResourceUpload";
import { ResourcesList } from "@/components/resources/ResourcesList";

const Index = () => {
  const session = useSession();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <WelcomeHeader email={session?.user?.email} />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <DashboardCard
          icon={Upload}
          title="Upload Work"
          description="Add new student work"
          onClick={() => navigate("/upload")}
        />
        <DashboardCard
          icon={FileText}
          title="Mark Work"
          description="Grade pending submissions"
          onClick={() => navigate("/marking")}
        />
        <DashboardCard
          icon={Users}
          title="Classes"
          description="Manage your classes"
          onClick={() => navigate("/classes")}
        />
        <DashboardCard
          icon={BookOpen}
          title="Rubrics"
          description="Create marking schemes"
          onClick={() => navigate("/rubrics")}
        />
      </div>

      <div className="space-y-8">
        <ResourceUpload />
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Resources</h2>
          <ResourcesList />
        </div>
      </div>
    </div>
  );
};

export default Index;
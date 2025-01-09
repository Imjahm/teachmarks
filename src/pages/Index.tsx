import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { FileText, Upload, Users, BookOpen } from "lucide-react";

const Index = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {session?.user?.email}</h1>
        <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <Upload className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Upload Work</h3>
              <p className="text-sm text-gray-600">Add new student work</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Mark Work</h3>
              <p className="text-sm text-gray-600">Grade pending submissions</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <Users className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Classes</h3>
              <p className="text-sm text-gray-600">Manage your classes</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold">Rubrics</h3>
              <p className="text-sm text-gray-600">Create marking schemes</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Submissions</h2>
          <p className="text-gray-600">No recent submissions</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Marking Progress</h2>
          <p className="text-gray-600">No work to mark</p>
        </Card>
      </div>
    </div>
  );
};

export default Index;
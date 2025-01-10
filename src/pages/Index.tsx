import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { FileText, Upload, Users, BookOpen } from "lucide-react";
import { Logo } from "@/components/Logo";

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
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <Logo size="sm" showText={false} />
          <div>
            <h1 className="text-3xl font-bold font-poppins text-primary">Welcome back</h1>
            <p className="text-secondary font-roboto">{session?.user?.email}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={handleSignOut}
          className="hover:bg-primary hover:text-white transition-colors"
        >
          Sign Out
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold font-poppins text-primary">Upload Work</h3>
              <p className="text-sm text-gray-600 font-roboto">Add new student work</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold font-poppins text-primary">Mark Work</h3>
              <p className="text-sm text-gray-600 font-roboto">Grade pending submissions</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold font-poppins text-primary">Classes</h3>
              <p className="text-sm text-gray-600 font-roboto">Manage your classes</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold font-poppins text-primary">Rubrics</h3>
              <p className="text-sm text-gray-600 font-roboto">Create marking schemes</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold font-poppins text-primary mb-4">Recent Submissions</h2>
          <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
            <p className="text-gray-600 font-roboto">No recent submissions</p>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold font-poppins text-primary mb-4">Marking Progress</h2>
          <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
            <p className="text-gray-600 font-roboto">No work to mark</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;